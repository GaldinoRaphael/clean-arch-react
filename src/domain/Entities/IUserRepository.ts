import { IUser } from "./IUser";

export interface IUserRepository{
    createUser(user: Omit<IUser, 'id'>): Promise<void>;
}