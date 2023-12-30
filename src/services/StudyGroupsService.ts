import { IStudyGroups } from "../domain/IStudyGroups";
import { IJWTResponse } from "../dto/IJWTResponse";
import { BaseEntityService } from "./BaseEntityService";

export class StudyGroupsService extends BaseEntityService<IStudyGroups> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)){
        super('v1/studyGroups', setJwtResponse);
    }

    async add(jwtData: IJWTResponse, newStudyGroup: IStudyGroups): Promise<boolean> {
        try {
            const response = await this.axios.post("http://localhost:8000/api/v1/StudyGroups", newStudyGroup, {
                headers: {
                    'Authorization': 'Bearer ' + jwtData.jwt 
                }
            });

            if (response.status === 201) {
                console.log('Course added successfully:', response.data);
                return true;
            }

            console.log('Failed to add studygroup:', response);
            return false;
        } catch (e) {
            console.error('Error adding Studygroup:', (e as Error).message, e);
            return false;
        }
    }
}