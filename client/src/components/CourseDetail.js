import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiHelper } from '../utils/apiHelper';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

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
    if (course) {
        return (
            <>
                <div className="actions--bar">
                    <div className="wrap">
                        <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                        <a className="button" href="/">Delete Course</a>
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                </div>
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
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