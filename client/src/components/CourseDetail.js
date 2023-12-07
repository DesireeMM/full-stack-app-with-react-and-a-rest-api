import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { apiHelper } from '../utils/apiHelper';
import UserContext from '../context/UserContext';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);

    useEffect(() => {
        const fetchCourse = async (id) => {
            await apiHelper(`/courses/${id}`, 'GET', '')
                .then(response => response.json())
                .then(responseData => setCourse(responseData));
        }
        fetchCourse(id);
    }, []);

    // let courseMaterialsList;

    // if (course.materialsNeeded) {
    //     const materialsList = course.materialsNeeded;
    //     console.log(typeof materialsList)
    //     // courseMaterialsList = materialsList.map(material => <li>{material}</li>);
    // }

    const handleDelete = async (evt) => {
        evt.preventDefault();

        const response = await apiHelper(`/courses/${id}`, "DELETE", null, authUser);
        try {
            if (response.status === 204) {
                console.log(`${course.title} was successfully deleted.`);
                navigate('/');
            } else {
                throw new Error()
            }
        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    };

    if (course) {
        return (
            <>
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
                        <p>{course.description}</p>
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
                                {/* <ul className="course--detail--list">{courseMaterialsList}</ul> */}
                            </>
                            :
                            <></>
                        }
                    </div>
                    </form>
                </div>
            </>
        );
    }

    return;
};

export default CourseDetail;