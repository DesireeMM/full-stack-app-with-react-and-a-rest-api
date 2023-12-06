import { useRef, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiHelper } from '../utils/apiHelper';
import UserContext from '../context/UserContext';

const UpdateCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const { authUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchCourse = async (id) => {
            await apiHelper(`/courses/${id}`, 'GET', '')
            .then(response => response.json())
            .then(responseData => setCourse(responseData));
        }
        fetchCourse(id);
    }, []);
    
    // ref values
    const courseTitle = useRef(course.title);
    const courseDescription = useRef(course.description);
    const estimatedTime = useRef(course.estimatedTime);
    const materialsNeeded = useRef(course.materialsNeeded);
    
    // event handlers
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const courseBody = {
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
            userId: authUser.id
        }

        const response = await apiHelper(`/courses/${id}`, "PUT", courseBody)
        try {
            if (response.status === 204) {
                console.log(`${course.title} has been updated successfully.`);
                navigate(`/courses/${id}`);
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
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
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                            {/* <p>By {authUser.firstName}</p> */}

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
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