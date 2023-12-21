import { IStudyGroups } from "../domain/IStudyGroups";
import { IJWTResponse } from "../dto/IJWTResponse";
import { BaseEntityService } from "./BaseEntityService";

export class StudyGroupsService extends BaseEntityService<IStudyGroups> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)){
        super('v1/studyGroups', setJwtResponse);
    }
}