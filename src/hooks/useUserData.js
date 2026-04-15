import { useState, useEffect } from "react"
import { getUserMainData } from "../services/api.js"

export function useUserData(userId) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!userId) return

        let cancelled = false

        setLoading(true)
        getUserMainData(userId)
            .then((result) => {
                if (!cancelled) setData(result)
            })
            .catch((err) => {
                if (!cancelled) setError(err.message)
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [userId])

    return { data, loading, error }
}
