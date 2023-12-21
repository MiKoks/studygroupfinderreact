import { IBaseEntity } from "./IBaseEntity";

export default interface IAppUser extends IBaseEntity {
    email: string;
    firstName: string;
    lastName: string;
}