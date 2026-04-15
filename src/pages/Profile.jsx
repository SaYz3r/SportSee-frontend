import { useParams } from "react-router-dom"
import { useUserData } from "../hooks/useUserData"
import Header from "../composants/header"
import Sidebar from "../composants/sidebar"
import Greating from "../composants/Greating"

function Profile() {
    const { userId } = useParams()
    const { data, loading, error } = useUserData(Number(userId))

    if (loading) return <p>Chargement...</p>
    if (error) return <p>Erreur : {error}</p>

    return (
        <>
            <Header />
            <Sidebar />
            <Greating firstName={data.firstName} />
        </>
    )
}

export default Profile
