import { useContext, useEffect, useState} from "react";
import { IStudyGroups } from "../../domain/IStudyGroups";
import { StudyGroupsService } from "../../services/StudyGroupsService";
import { JwtContext } from "../Root";

const StudyGroups = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const studyGroupsService = new StudyGroupsService(setJwtResponse!);

    const [data, setData] = useState([] as IStudyGroups[]);
    const [newStudyGroup, setNewStudyGroup] = useState({ GroupName: "", Description: "" });

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
        }
    }, []);

    return (
        <>
            <label htmlFor="studyGroupsSelect">StudyGroups</label>
            <ul>
            {data.map((studyGroup, index) => (
                <strong>
                <li key={index}>
                    {studyGroup.groupName} - {studyGroup.location}
                </li>
                </strong>
            ))}
        </ul>
        </>
    );
}

export default StudyGroups;