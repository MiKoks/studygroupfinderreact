import { IBaseEntity } from "./IBaseEntity";

export interface IStudyGroups extends IBaseEntity {
    groupName: string,
    description: string,
    meetingTimes: string,
    location: string,
    maxGroupSize: number,
}