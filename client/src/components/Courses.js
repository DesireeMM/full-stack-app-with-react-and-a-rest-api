import { useState, useEffect } from 'react';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };

        fetch("http://localhost:5000/api/courses", fetchOptions)
            .then(response => response.json())
            .then(responseData => setCourses(responseData))
    }, [])

    const courseList = courses.map((course) => {
        return (
            <a className="course--module course--link" href={`/courses/${course.id}`}>
                <h2 class="course--label">Course</h2>
                <h3 class="course--title">{course.title}</h3>
            </a>
        );
    })

    return (
        <div className="wrap main--grid">
            {courseList}
            <a className="course--module course--add--module" href="create-course.html">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    );
};

export default Courses;