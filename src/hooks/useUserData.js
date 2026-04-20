import { useState, useEffect } from "react"
import { getUserMainData, getUserPerformance, getUserAverageSessions } from "../services/api.js"

export function useUserData(userId) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!userId) return

        let cancelled = false

        setLoading(true)
        Promise.all([
            getUserMainData(userId),
            getUserPerformance(userId),
            getUserAverageSessions(userId),
        ])
        .then(([mainData, performance, averageSessions]) => {
            if (!cancelled) setData({ mainData, performance, averageSessions })
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
