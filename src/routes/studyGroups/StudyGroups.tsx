import { ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import { IStudyGroups } from "../../domain/IStudyGroups";
import { StudyGroupsService } from "../../services/StudyGroupsService";
import { JwtContext } from "../Root";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ICourses } from "../../domain/ICourses";
import { CoursesService } from "../../services/CoursesService";

const StudyGroups = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const studyGroupsService = new StudyGroupsService(setJwtResponse!);

    const [data, setData] = useState([] as IStudyGroups[]);
    const [newStudyGroup, setNewStudyGroup] = useState({ groupName: "", description: "" , meetingTimes: "", location: "", maxGroupSize: 1, courseId: ""});

    const [courses, setCourses] = useState([] as ICourses[]);
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const coursesService = new CoursesService(setJwtResponse!);
    useEffect(() => {
        if (jwtResponse) {
            studyGroupsService.getAll(jwtResponse).then(
                response => {
                    console.log(response);
                    if (response){
                        setData(response);
                    } else {
                        setData([]);
                    }
                }
            );
            coursesService.getAll(jwtResponse).then(
                response => {
                    if (response) {
                        setCourses(response);
                    }
                }
            );
        }
    }, []);

    const navigate = useNavigate();

    const handleStudygroupClick = (studygroup: IStudyGroups) => {
        console.log("Course data to be passed:", studygroup);
        navigate(`../studygroups/selectedStudyGroupView`, { state: studygroup });
    };

    const handleNewStudygroupChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewStudyGroup((prevStudygroup) => ({ ...prevStudygroup, [name]: value }));
    };

    const handleNewStudygroupSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (jwtResponse) {
            const studyGroupToCreate = {
                ...newStudyGroup,
                courseId: selectedCourseId // Use selectedCourseId if you want to use the selectedCourseId state variable
            };

            const success = await studyGroupsService.add(jwtResponse, studyGroupToCreate);

            if (success) {
                // refresh course list after
                const updatedStudyGroups = await studyGroupsService.getAll(jwtResponse);
                if (updatedStudyGroups) {
                    setData(updatedStudyGroups);
                }
            }

            // clear
            setNewStudyGroup({ groupName: "", description: "", meetingTimes: "", location: "", maxGroupSize: 1 , courseId: ""});
        }
    };

    const handleCourseChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNewStudyGroup((prevStudyGroup) => ({
            ...prevStudyGroup,
            [name]: value // Make sure the name attribute of the select element is 'courseId'
        }));
        setSelectedCourseId(value);
    };


    return (
        <>
        <Outlet />
        <br></br>
            <label htmlFor="studyGroupsSelect">StudyGroups</label>
            <ul>
            {data.map((studyGroup, index) => (
                <strong>
                <li key={studyGroup.id}>
                <Link to="../studygroups/selectedStudyGroupView" className="nav-link text-dark" onClick={() => handleStudygroupClick(studyGroup)} state={studyGroup}>
                    {studyGroup.groupName} - {studyGroup.location}
                </Link>
                </li>
                </strong>
            ))}
        </ul>

        <form onSubmit={handleNewStudygroupSubmit}>
                <label htmlFor="groupName">Group Name:</label>
                <input
                    type="text"
                    name="groupName"
                    value={newStudyGroup.groupName}
                    onChange={handleNewStudygroupChange}
                    
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={newStudyGroup.description}
                    onChange={handleNewStudygroupChange}
                    
                />
                <label htmlFor="meetingTimes">Meeting times:</label>
                <input
                    type="text"
                    name="meetingTimes"
                    value={newStudyGroup.meetingTimes}
                    onChange={handleNewStudygroupChange}
                    
                />
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={newStudyGroup.location}
                    onChange={handleNewStudygroupChange}
                    
                />
                <label htmlFor="StudyGroupGmaxGroupSizeroupSize">Group Size:</label>
                <input
                    type="number"
                    name="maxGroupSize"
                    value={newStudyGroup.maxGroupSize}
                    onChange={handleNewStudygroupChange}
                    
                />
                <label htmlFor="courseId">Course:</label>
                <select 
                    name="courseId" 
                    value={newStudyGroup.courseId} 
                    onChange={handleCourseChange}
                >
                    <option value="">-- Select Course --</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.courseName}
                        </option>
                    ))}
                </select>
                <button type="submit">Add group</button>
            </form>

        </>
    );
}

export default StudyGroups;