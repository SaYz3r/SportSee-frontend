import { useParams } from "react-router-dom"
import { useUserData } from "../hooks/useUserData"
import Header from "../composants/Header"
import Sidebar from "../composants/Sidebar"
import Greating from "../composants/Greating"
import KeyData from "../composants/KeyData"
import "../styles/Profile.css"
import ScoreChart from "../composants/ScoreChart"

function Profile() {
    const { userId } = useParams()
    const { data, loading, error } = useUserData(Number(userId))

    if (loading) return <p>Chargement...</p>
    if (error) return <p>Erreur : {error}</p>

    return (
        <>
            <Header />
            <Sidebar />
            <main className="main">
                <div className="greeting">
                    <Greating firstName={data.firstName} />
                </div>

                <div className="dashboard">
                    {/* Colonne gauche */}
                    <div className="charts">
                        <div className="activity-chart">
                            Activité quotidienne
                        </div>

                        {/* 3 petits graphiques */}
                        <div className="small-charts">
                            <div className="small-chart">Sessions</div>
                            <div className="small-chart">Radar</div>
                            <div className="small-chart">
                                <ScoreChart score={data.score} />
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite */}
                    <KeyData keyData={data.keyData} />
                </div>
            </main>
        </>
    )
}

export default Profile
