import { IUser } from "../Entities/IUser";
import { IUserRepository } from "../Entities/IUserRepository";

export class CreateUser {
    constructor(private userRepository: IUserRepository) {}
    
    execute(user: Omit<IUser, 'id'>){
        this.userRepository.createUser(user);
    }
}