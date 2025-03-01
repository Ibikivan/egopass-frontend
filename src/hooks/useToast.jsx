import { createContext, useState } from "react";

export const ToastContext = createContext({
    isToastOpen: false,
    openToast: () => {},
    closeToast: () => {}
})

export function ToastContextProvider({ children }) {
    const [isToastOpen, setIsToastOpen] = useState(false)

    const openToast = (data) => {
        setIsToastOpen(data)
    }

    const closeToast = () => {
        setIsToastOpen(false)
    }

    return <ToastContext.Provider value={{ isToastOpen, openToast, closeToast }}>
        {children}
    </ToastContext.Provider>
}