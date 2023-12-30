import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { ICourses } from "../../domain/ICourses";
import { CoursesService } from "../../services/CoursesService";
import { JwtContext } from "../Root";
import { Link, useLocation} from "react-router-dom";


const SelectedStudyGroupView = () => {
  const location = useLocation();
  const selectedStudygroup = location.state;
  //const ls = localStorage.getItem("authToken");
    
  if (!selectedStudygroup) {
    return (
      <div>
        <h2>No Studygroup selected</h2>
        <p>Please go back to the Studygroup list and select a Studygroup.</p>
        <Link to="../studygroups" className="nav-link text-dark">
          Back to Studygroups
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>Selected Studygroup:</h2>
        <p>Name: {selectedStudygroup.groupName}</p>
        <p>Description: {selectedStudygroup.description}</p>
        <p>Meeting times: {selectedStudygroup.meetingTimes}</p>
        <p>location: {selectedStudygroup.location}</p>
        <p>group size limit: {selectedStudygroup.maxGroupSize}</p>
      </div>
      <li className="nav-item">
        <Link to="../../studygroups" className="nav-link text-dark">
          Back to Studygroups
        </Link>
      </li>
    </>
  );
};

export default SelectedStudyGroupView;