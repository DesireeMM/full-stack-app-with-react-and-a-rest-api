import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Markdown from 'react-markdown';
import { apiHelper } from '../utils/apiHelper';
import UserContext from '../context/UserContext';

// Component to render individual courses
const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);
    const [course, setCourse] = useState(null);

    // fetches course once
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiHelper(`/courses/${id}`, 'GET', '');
                if (response.status === 200) {
                    const resJSON = await response.json();
                    setCourse(resJSON);
                } else if (response.status === 404) {
                    navigate('/notfound')
                } else {
                    throw new Error()
                }
            } catch (error) {
                console.log(error);
                navigate('/error');
            }
        }
        fetchCourse();
    }, [id, navigate]);

    // handles user deleting an owned course
    const handleDelete = async (evt) => {
        evt.preventDefault();

        const response = await apiHelper(`/courses/${id}`, "DELETE", null, authUser);
        try {
            if (response.status === 204) {
                console.log(`${course.title} was successfully deleted.`);
                navigate('/');
            } else if (response.status === 404) {
                navigate('/notfound');
            } else if (response.status === 403) {
                navigate('/forbidden')
            } else {
                throw new Error()
            }
        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    };

    // if a course has been fetched, render component
    if (course) {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        { authUser && authUser.id === course.owner.id ? 
                        <>
                        <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                        <a className="button" href={`/courses/${id}`} onClick={handleDelete}>Delete Course</a>
                        </>
                        :
                        <></>
                        }
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                </div>
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>By {course.owner.firstName} {course.owner.lastName}</p>
                        <Markdown>{course.description}</Markdown>
                    </div>
                        <div>
                        {course.estimatedTime ?
                            <>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>
                            </>
                            :
                            <></>
                        }
                        {course.materialsNeeded ?
                            <>
                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <Markdown>{course.materialsNeeded}</Markdown>
                                </ul>
                            </>
                            :
                            <></>
                        }
                    </div>
                    </form>
                </div>
            </main>
        );
    }
    
    return;
};

export default CourseDetail;