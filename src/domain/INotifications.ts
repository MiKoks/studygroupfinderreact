import { IBaseEntity } from "./IBaseEntity";

export interface IGroupJoinRequests extends IBaseEntity {
    Message: string,
    CreatedAt: Date,
}