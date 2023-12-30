import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { ICourses } from "../../domain/ICourses";
import { CoursesService } from "../../services/CoursesService";
import { JwtContext } from "../Root";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./courses.css";

const Courses = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const courseService = new CoursesService(setJwtResponse!);

    const [data, setData] = useState([] as ICourses[]);
    const [newCourse, setNewCourse] = useState({ courseName: "", courseCode: "" });

    useEffect(() => {
        if (jwtResponse) {
            courseService.getAll(jwtResponse).then(
                response => {
                    console.log(response);
                    if (response){
                        setData(response);
                    } else {
                        setData([]);
                    }
                }
            );
        }
    }, []);

    const navigate = useNavigate();

    const handleCourseClick = (course: ICourses) => {
        console.log("Course data to be passed:", course);
        navigate(`../courses/selectedCourseView`, { state: course });
        console.log("here it is", course.id);
    };

    const handleNewCourseChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
    };

    const handleNewCourseSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (jwtResponse) {
            const success = await courseService.add(jwtResponse, newCourse);

            if (success) {
                // refresh course list after
                const updatedCourses = await courseService.getAll(jwtResponse);
                if (updatedCourses) {
                    setData(updatedCourses);
                }
            }

            // clear
            setNewCourse({ courseName: "", courseCode: "" });
        }
    };

    return (
        <>
        <Outlet />
        <br></br>
            <label htmlFor="coursesSelect">Courses:</label>
            <ul>
            {data.map((course, index) => (
                <strong>
                <li key={course.id} className="nav-item-list">
                    <Link to="../courses/selectedCourseView" className="nav-link text-dark" onClick={() => handleCourseClick(course)} state={course}>
                        {course.courseName} - {course.courseCode}
                    </Link>
                </li>
                </strong>
            ))}
        </ul>

        {/*<form onSubmit={handleNewCourseSubmit}>
                <label htmlFor="courseName">Course Name:</label>
                <input
                    type="text"
                    name="courseName"
                    value={newCourse.courseName}
                    onChange={handleNewCourseChange}
                    
                />
                <label htmlFor="courseCode">Course Code:</label>
                <input
                    type="text"
                    name="courseCode"
                    value={newCourse.courseCode}
                    onChange={handleNewCourseChange}
                    
                />
                <button type="submit">Add Course</button>
            </form>*/}

        </>
    );
}

export default Courses;
