import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PermissionStore {
    permissions: string[];
    setPermissions: (perms: string[]) => void;
}

export const usePermissionStore = create(
    persist<PermissionStore>(
        (set) => ({
            permissions: [],
            setPermissions: (perms) => set({ permissions: perms }),
        }),
        {
            name: "user-permissions", // nome no localStorage
        }
    )
);
