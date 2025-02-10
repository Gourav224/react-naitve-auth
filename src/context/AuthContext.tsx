import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/storage";
import { AuthState, User } from "../types";

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (userData: Omit<User, "id">) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const user = await storage.getCurrentUser();
            setState({
                user,
                isAuthenticated: !!user,
                isLoading: false,
            });
        } catch (error) {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    };

    const login = async (email: string, password: string) => {
        const users = await storage.getUsers();
        const user = users.find((u) => u.email === email);

        if (!user || user.password !== password) {
            throw new Error("Invalid credentials");
        }

        await storage.setCurrentUser(user);
        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });
    };

    const register = async (userData: Omit<User, "id">) => {
        const users = await storage.getUsers();
        if (users.some((u) => u.email === userData.email)) {
            throw new Error("Email already exists");
        }

        const newUser = {
            ...userData,
            id: Date.now().toString(),
        };

        await storage.saveUser(newUser);
        await storage.setCurrentUser(newUser);

        setState({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
        });
    };

    const logout = async () => {
        await storage.setCurrentUser(null);
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    const updateProfile = async (userData: Partial<User>) => {
        if (!state.user) return;

        const updatedUser = {
            ...state.user,
            ...userData,
        };

        await storage.saveUser(updatedUser);
        await storage.setCurrentUser(updatedUser);

        setState((prev) => ({
            ...prev,
            user: updatedUser,
        }));
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
