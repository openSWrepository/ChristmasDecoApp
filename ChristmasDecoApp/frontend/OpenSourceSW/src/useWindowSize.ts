import { useState, useEffect } from "react"

export const useWindowSize = () => {
    const isBrowser = typeof window !== "undefined"

    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(() => {
        if (!isBrowser) return

        const setWindowSize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }

        window.addEventListener("resize", setWindowSize)

        return () => {
            window.removeEventListener("resize", setWindowSize)
        }
    }, [isBrowser])

    return { width, height }
}