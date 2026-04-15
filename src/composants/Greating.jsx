import "../styles/Greating.css"

function Greeting({ firstName }) {
    return (
        <section className="greeting">
            <h1 className="greeting-title">
                Bonjour <span className="greeting-name">{firstName}</span>
            </h1>
            <p className="greeting-subtitle">
                Félicitation ! Vous avez explosé vos objectifs hier 👋
            </p>
        </section>
    )
}

export default Greeting
