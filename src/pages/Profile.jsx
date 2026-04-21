import { useParams } from "react-router-dom"
import { useUserData } from "../hooks/useUserData"
import Header from "../composants/Header"
import Sidebar from "../composants/Sidebar"
import Greating from "../composants/Greating"
import KeyData from "../composants/KeyData"
import "../styles/Profile.css"
import ScoreChart from "../composants/ScoreChart"
import RadarChart from "../composants/RadarChart"
import SessionsChart from "../composants/SessionsChart"
import ActivityChart from "../composants/ActivityChart"

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
                <div className="content">
                    <div className="greeting">
                        <Greating firstName={data.mainData.firstName} />
                    </div>

                    <div className="dashboard">
                        {/* Colonne gauche */}
                        <div className="charts">
                            <div className="activity-chart">
                                <ActivityChart sessions={data.activity.sessions} />
                            </div>

                            {/* 3 petits graphiques */}
                            <div className="small-charts">
                                <div className="small-chart">
                                    <SessionsChart sessions={data.averageSessions.sessions} />
                                </div>
                                <div className="small-chart">
                                    <RadarChart data={data.performance.data}/>
                                </div>
                                <div className="small-chart">
                                    <ScoreChart score={data.mainData.score} />
                                </div>
                            </div>
                        </div>

                        {/* Colonne droite */}
                        <KeyData keyData={data.mainData.keyData} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile
