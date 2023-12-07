import { useRef, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiHelper } from '../utils/apiHelper';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UpdateCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const { authUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // ref values
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    
    useEffect(() => {
        const fetchCourse = async (id) => {
            try {
                const response = await apiHelper(`/courses/${id}`, 'GET', '');
                if (response.status === 200) {
                    const resJSON = await response.json();
                    if (resJSON.owner.id !== authUser.id) {
                        navigate('/forbidden');
                    } else {
                        setCourse(resJSON);
                    }
                } else if (response.status === 404) {
                    navigate('/notfound');
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error);
                navigate('/error');
            }
        }
        fetchCourse(id);

    }, []);
    
    
    // event handlers
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const courseBody = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.id
        }

        const response = await apiHelper(`/courses/${id}`, "PUT", courseBody, authUser)
        try {
            if (response.status === 204) {
                console.log(`${course.title} has been updated successfully.`);
                navigate(`/courses/${id}`);
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else if (response.status === 404) {
                navigate('/notfound');
            } else if (response.status === 403) {
                navigate('/forbidden');
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }

    }

    const handleCancel = (evt) => {
        evt.preventDefault();
        navigate(`/courses/${id}`);
    };

    if (course) {
        return (
            <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course?.title} ref={courseTitle} />

                            <p>By {course.owner.firstName} {course.owner.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={course?.description} ref={courseDescription}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course?.estimatedTime} ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course?.materialsNeeded} ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        );
    }

    return;
};

export default UpdateCourse;