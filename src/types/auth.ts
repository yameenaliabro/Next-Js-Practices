import { User } from 'firebase/auth';

export type LoginProps = {
    email: string;
    password: string;
}

export type SignupProps = {
    username: string;
    email: string;
    password: string;
}

export type AuthContextType = {
    login: (props: LoginProps) => Promise<void>;
    signup: (props: SignupProps) => Promise<void>;
    signout: VoidFunction;
    user: User | null;
    isAuthenticated: boolean;
}