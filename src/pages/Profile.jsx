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
import ErrorPage from "../composants/ErrorPage"

function Profile() {
    const { userId } = useParams()
    const { data, loading, error } = useUserData(Number(userId))

    if (loading) return (
        <>
            <Header />
            <Sidebar />
            <div style={{
                position: "fixed",
                top: "55%",
                left: "55%",
                transform: "translate(-55%, -55%)",
                textAlign: "center",
                color: "#20253A"
            }}>
                <p style={{ fontSize: "24px", fontWeight: "700" }}>Chargement...</p>
            </div>
        </>
    )

    if (error) return <ErrorPage error={error} />

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
