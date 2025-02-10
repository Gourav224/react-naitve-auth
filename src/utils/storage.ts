import * as SecureStore from "expo-secure-store";
import { User } from "../types";

export const storage = {
    async getUsers(): Promise<User[]> {
        const users = await SecureStore.getItemAsync("users");
        return users ? JSON.parse(users) : [];
    },

    async saveUser(user: User): Promise<void> {
        const users = await this.getUsers();
        const existingUserIndex = users.findIndex((u) => u.id === user.id);

        if (existingUserIndex !== -1) {
            users[existingUserIndex] = user;
        } else {
            users.push(user);
        }

        await SecureStore.setItemAsync("users", JSON.stringify(users));
    },

    async getCurrentUser(): Promise<User | null> {
        const user = await SecureStore.getItemAsync("currentUser");
        return user ? JSON.parse(user) : null;
    },

    async setCurrentUser(user: User | null): Promise<void> {
        if (user) {
            await SecureStore.setItemAsync("currentUser", JSON.stringify(user));
        } else {
            await SecureStore.deleteItemAsync("currentUser");
        }
    },
};
