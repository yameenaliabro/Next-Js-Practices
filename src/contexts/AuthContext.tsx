import { Splash } from "@src/components";
import { firebaseAuth } from "@src/services";
import { AuthContextType, LoginProps, SignupProps } from "@src/types";
import { removeAxiosToken, setaxiostoken } from "@src/utils/axios";
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { useMemo, useState, useCallback, createContext, useEffect, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null)

    const login = useCallback(async ({ email, password }: LoginProps) => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log("🚀 ~ file: AuthContext.tsx:24 ~ login ~ error:", error)
            throw error
        }
    }, [])

    const signup = useCallback(async ({ email, password, username }: SignupProps) => {
        try {
            const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            await updateProfile(user, {
                displayName: username
            })
        } catch (error) {
            console.log("🚀 ~ file: AuthContext.tsx:35 ~ signup ~ error:", error)
            throw error
        }
    }, [])

    const signout = useCallback(() => {
        signOut(firebaseAuth)
    }, [])

    const checkAuth = useCallback(() => {
        onAuthStateChanged(firebaseAuth, async (_user) => {
            setLoading(true)
            setUser(_user)
            setIsAuthenticated(!!_user)
            if (_user) {

                const _token = await _user?.getIdToken();
                if (_token) {
                    setaxiostoken(_token)
                }
                setToken(_token)
            } else {
                setToken(null)
                removeAxiosToken()
            }
            setLoading(false)
        })
    }, [])


    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    const value = useMemo(() => ({
        login,
        signup,
        signout,
        user,
        isAuthenticated,
    }), [
        isAuthenticated,
        login,
        signup,
        signout,
        user
    ]);

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Splash /> : children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider }