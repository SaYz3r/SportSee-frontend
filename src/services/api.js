import { USER_MAIN_DATA, USER_PERFORMANCE, USER_AVERAGE_SESSIONS, USER_ACTIVITY } from "./mock/mockData.js"
import { UserMainData, UserPerformance, UserAverageSessions, UserActivity } from "../models/UserDataModel.js"

const USE_MOCK = true

export async function getUserMainData(userId) {
    if (USE_MOCK) {
        const raw = USER_MAIN_DATA.find((u) => u.id === userId)
        if (!raw) throw new Error(`Utilisateur ${userId} introuvable`)
        return new UserMainData(raw)
    }

    const response = await fetch(`http://localhost:3000/user/${userId}`)
    const json = await response.json()
    return new UserMainData(json.data)
}

export async function getUserPerformance(userId) {
    if (USE_MOCK) {
        const raw = USER_PERFORMANCE.find((u) => u.userId === userId)
        if (!raw) throw new Error(`Performance de l'utilisateur ${userId} introuvable`)
        return new UserPerformance(raw)
    }

    const response = await fetch(`http://localhost:3000/user/${userId}/performance`)
    const json = await response.json()
    return new UserPerformance(json.data)
}

export async function getUserAverageSessions(userId) {
    if (USE_MOCK) {
        const raw = USER_AVERAGE_SESSIONS.find((u) => u.userId === userId)
        if (!raw) throw new Error(`Sessions de l'utilisateur ${userId} introuvables`)
        return new UserAverageSessions(raw)
    }

    const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`)
    const json = await response.json()
    return new UserAverageSessions(json.data)
}

export async function getUserActivity(userId) {
    if (USE_MOCK) {
        const raw = USER_ACTIVITY.find((u) => u.userId === userId)
        if (!raw) throw new Error(`Activité de l'utilisateur ${userId} introuvable`)
        return new UserActivity(raw)
    }

    const response = await fetch(`http://localhost:3000/user/${userId}/activity`)
    const json = await response.json()
    return new UserActivity(json.data)
}