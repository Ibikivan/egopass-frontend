import { createContext, useState } from "react";

export const ToastContext = createContext({
    isToastOpen: {
        isOpen: false,
        data: null
    },
    openToast: () => {},
    closeToast: () => {}
})

export function ToastContextProvider({ children }) {
    const [toast, setToast] = useState({
        isOpen: false,
        data: null
    })

    const openToast = (data) => {
        setToast({
            isOpen: true,
            data: data
        })
    }

    const closeToast = () => {
        setToast({
            ...toast,
            isOpen: false
        })
    }

    return <ToastContext.Provider value={{ toast, openToast, closeToast }}>
        {children}
    </ToastContext.Provider>
}