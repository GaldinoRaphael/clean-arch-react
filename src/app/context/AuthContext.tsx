import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../../infra/supabase/config";

interface IAuthContext {
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    session: Session | null;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                setSession(session)
                console.log('getSession', session)
            }).finally(() => setLoading(false))

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log('onAuthStateChange', session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const logout = async () => {
        const error = await supabase.auth.signOut();

        if (error) {
            throw error;
        }
    }

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            throw error;
        }

    };

    return (

        <AuthContext.Provider value={{ session, logout, login }}>
            {loading ? 'Loading...' : children}
        </AuthContext.Provider>
    )
};