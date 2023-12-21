import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { ICourses } from "../../domain/ICourses";
import { CoursesService } from "../../services/CoursesService";
import { JwtContext } from "../Root";
import { Link, useLocation} from "react-router-dom";


const SelectedCourseView = () => {
  const location = useLocation();
  const selectedCourse = location.state;
  //const ls = localStorage.getItem("authToken");
    
  if (!selectedCourse) {
    return (
      <div>
        <h2>No course selected</h2>
        <p>Please go back to the courses list and select a course.</p>
        <Link to="../courses" className="nav-link text-dark">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>Selected Course:</h2>
        <p>Name: {selectedCourse.courseName}</p>
        <p>Code: {selectedCourse.courseCode}</p>
      </div>
      <li className="nav-item">
        <Link to="../../courses" className="nav-link text-dark">
          Back to Courses
        </Link>
      </li>
    </>
  );
};

export default SelectedCourseView;