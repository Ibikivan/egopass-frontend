import { useEffect } from "react"

export function usePageTitle(currentTitle) {
    useEffect(() => {
        const prevTitle = document.title
        document.title = currentTitle

        return () => document.title = prevTitle
    }, [])
}
