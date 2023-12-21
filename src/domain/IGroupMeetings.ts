import { IBaseEntity } from "./IBaseEntity";

export interface IGroupJoinRequests extends IBaseEntity {
    MeetingTime: Date,
    MeetingLocation: string,
}