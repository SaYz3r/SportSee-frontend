export const USER_MAIN_DATA = [
    {
        id: 12,
        userInfos: {
            firstName: "Karl",
            lastName: "Dovineau",
            age: 31,
        },
        score: 0.12,
        keyData: {
            calorieCount: 1930,
            proteinCount: 155,
            carbohydrateCount: 290,
            lipidCount: 50,
        },
    },
    {
        id: 18,
        userInfos: {
            firstName: "Cecilia",
            lastName: "Ratorez",
            age: 34,
        },
        todayScore: 0.3,
        keyData: {
            calorieCount: 2500,
            proteinCount: 90,
            carbohydrateCount: 50,
            lipidCount: 120,
        },
    },
]

export const USER_PERFORMANCE = [
    {
        userId: 12,
        kind: {
            1: "intensity",
            2: "speed",
            3: "strength",
            4: "endurance",
            5: "energy",
            6: "cardio",
        },
        data: [
            { value: 80, kind: 1 },
            { value: 120, kind: 2 },
            { value: 140, kind: 3 },
            { value: 50, kind: 4 },
            { value: 200, kind: 5 },
            { value: 90, kind: 6 },
        ],
    },
    {
        userId: 18,
        kind: {
            1: "intensity",
            2: "speed",
            3: "strength",
            4: "endurance",
            5: "energy",
            6: "cardio",
        },
        data: [
            { value: 20, kind: 1 },
            { value: 90, kind: 2 },
            { value: 110, kind: 3 },
            { value: 218, kind: 4 },
            { value: 60, kind: 5 },
            { value: 23, kind: 6 },
        ],
    },
]

export const USER_AVERAGE_SESSIONS = [
    {
        userId: 12,
        sessions: [
            { day: 1, sessionLength: 30 },
            { day: 2, sessionLength: 23 },
            { day: 3, sessionLength: 45 },
            { day: 4, sessionLength: 50 },
            { day: 5, sessionLength: 68 },
            { day: 6, sessionLength: 60 },
            { day: 7, sessionLength: 52 },
        ],
    },
    {
        userId: 18,
        sessions: [
            { day: 1, sessionLength: 200 },
            { day: 2, sessionLength: 23 },
            { day: 3, sessionLength: 45 },
            { day: 4, sessionLength: 50 },
            { day: 5, sessionLength: 68 },
            { day: 6, sessionLength: 60 },
            { day: 7, sessionLength: 52 },
        ],
    },
]