import { useState, useEffect } from "react"
import { getUserMainData, getUserPerformance, getUserAverageSessions, getUserActivity } from "../services/api.js"

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
            getUserActivity(userId),
        ])
        .then(([mainData, performance, averageSessions, activity]) => {
            if (!cancelled) setData({ mainData, performance, averageSessions, activity })
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
