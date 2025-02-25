import { useSyncExternalStore } from "react"

const getState = () => {
    return navigator.onLine
}

const suscribe = (callback) => {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)

    return () => {
        window.removeEventListener('online', callback)
        window.removeEventListener('offline', callback)
    }
}

export function useOnline() {
    return useSyncExternalStore(suscribe, getState, () => true)
}
