
import { IUser } from "../../domain/Entities/IUser";
import { IUserRepository } from "../../domain/Entities/IUserRepository";
import { supabase } from "./config";

export class UserSupabaseRepository implements IUserRepository {
    async createUser(user: Omit<IUser, "id">): Promise<void> {
        const { error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                emailRedirectTo: 'http://localhost:5173/',
            },
        })

        if (error) {
            throw new Error(error.message)
        }
    }

}