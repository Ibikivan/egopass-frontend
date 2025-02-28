import { createContext, useState } from "react";

export const ProfilContext = createContext({
    userProfile: null,
    setUserProfil: () => {}
})

export function ProfileContextProvider({ children }) {
    const [userProfile, switchProfile] = useState(null)

    const setUserProfil = (profil) => {
        switchProfile(profil)
    }

    return <ProfilContext.Provider value={{ userProfile, setUserProfil }}>
        {children}
    </ProfilContext.Provider>
}
