import { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { apiHelper } from '../utils/apiHelper';

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

        const courseBody = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            // userId: authUser.id
        }

        const response = await apiHelper(`/courses`, 'POST', courseBody)

        try {
            if (response.status === 201) {
                console.log(`${courseTitle.current.value} has been successfully created.`);
                navigate(`/courses/${id}`)
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
        <div className="wrap">
                <h2>Create Course</h2>
                {/* <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div> */}
                <form>
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
                    <button class="button" type="submit" onSubmit={handleSubmit}>Create Course</button><button class="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
    );
};

export default CreateCourse;