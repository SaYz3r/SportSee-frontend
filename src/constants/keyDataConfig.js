import caloriesIcon  from "../assets/keyData/Calories.svg"
import glucidesIcon  from "../assets/keyData/Glucides.svg"
import lipidesIcon   from "../assets/keyData/Lipides.svg"
import proteinesIcon from "../assets/keyData/Proteines.svg"

export const KEY_DATA_CONFIG = [
    {
        key:    "calorieCount",
        icon:   caloriesIcon,
        label:  "Calories",
        color:  "rgba(255, 0, 0, 0.07)",
        format: (v) => `${v.toLocaleString("fr-FR")}kCal`,
    },
    {
        key:    "proteinCount",
        icon:   proteinesIcon,
        label:  "Protéines",
        color:  "rgba(74, 184, 255, 0.1)",
        format: (v) => `${v}g`,
    },
    {
        key:    "carbohydrateCount",
        icon:   glucidesIcon,
        label:  "Glucides",
        color:  "rgba(253, 204, 12, 0.1)",
        format: (v) => `${v}g`,
    },
    {
        key:    "lipidCount",
        icon:   lipidesIcon,
        label:  "Lipides",
        color:  "rgba(253, 81, 129, 0.1)",
        format: (v) => `${v}g`,
    },
]