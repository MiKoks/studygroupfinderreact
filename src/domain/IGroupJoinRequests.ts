import { IBaseEntity } from "./IBaseEntity";

export interface IGroupJoinRequests extends IBaseEntity {
        RequestStatus: boolean,
        RequestedAt: Date,
}
