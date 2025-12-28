import {create} from 'zustand';
interface User{
id: string;
        email: string;
        
}



interface UserState{
    user: User|null,
    selectedorganization:organization|null
    login: (userData: User) => void,
    logout: () => void,
    selectorganization: (organizationData: organization) => void,
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    selectedorganization: null,
    login: (userData) => set((state) => ({...state, user: userData})),
    logout: () => set((state) => ({...state, user: null, selectedorganization: null})),
    selectorganization: (organizationData: organization) => set((state) => ({...state, selectedorganization: organizationData})),
}))