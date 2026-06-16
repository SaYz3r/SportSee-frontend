import Header from "./Header"
import Sidebar from "./Sidebar"

function ErrorPage({ error }) {
    const isNotFound = error === "Utilisateur introuvable"

    return (
        <>
            <Header />
            <Sidebar />
            <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "#20253A"
            }}>
                <p style={{ fontSize: "80px", fontWeight: "700", color: "#ff0000" }}>
                    {isNotFound ? "404" : "503"}
                </p>
                <p style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>
                    {isNotFound ? "Utilisateur introuvable" : "Serveur inaccessible"}
                </p>
                <p style={{ fontSize: "16px", color: "#74798C" }}>
                    {isNotFound
                        ? "Cet utilisateur n'existe pas."
                        : "Vérifiez que le backend est bien lancé sur le port 3000."}
                </p>
            </div>
        </>
    )
}

export default ErrorPage