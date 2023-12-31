import { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { apiHelper } from '../utils/apiHelper';
import ErrorsDisplay from './ErrorsDisplay';

// component to render the form used to create new courses
const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    // form refs
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    // event handlers
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        // generate request body
        const courseBody = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.id
        }

        try {
            const response = await apiHelper(`/courses`, 'POST', courseBody, authUser)
            if (response.status === 201) {
                console.log(`${courseTitle.current.value} has been successfully created.`);
                navigate("/")
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate('/error')
        };
    };

    const handleCancel = (evt) => {
        evt.preventDefault();
        navigate("/")
    };

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

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
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
};

export default CreateCourse;