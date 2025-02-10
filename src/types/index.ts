export interface User {
    id: string;
    name: string;
    email: string;
    gender: "male" | "female" | "other";
    dateOfBirth: Date;
    avatar?: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
