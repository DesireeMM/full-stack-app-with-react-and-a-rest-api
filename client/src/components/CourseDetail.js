import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect( () => {
        const fetchCourse = async (id) => {
            const fetchOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }
    
            await fetch(`http://localhost:5000/api/courses/${id}`, fetchOptions)
                .then(response => response.json())
                .then(responseData => {
                    console.log("Response Data: ", responseData);
                    setCourse(responseData)
                    console.log(course);
                })


            console.log("Course State: ", course);
        }

        fetchCourse(id);
        console.log("Outside course: ", course);

    }, []);

    // let courseMaterialsList;

    // if (course.materialsNeeded) {
    //     const materialsList = course.materialsNeeded;
    //     console.log(typeof materialsList)
    //     // courseMaterialsList = materialsList.map(material => <li>{material}</li>);
    // }

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
                    {/* <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>{course.description}</p>
                    </div> */}
                    {/* <div>
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
                                <ul className="course--detail--list">{courseMaterialsList}</ul>
                            </>
                            :
                            <></>
                        }
                    </div> */}
                </form>
            </div>
        </>
    );
};

export default CourseDetail;