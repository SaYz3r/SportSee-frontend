import "../styles/Sidebar.css"
import Meditation from "../assets/Meditation.png"
import Natation from "../assets/Natation.png"
import Cyclisme from "../assets/Cyclisme.png"
import Musculation from "../assets/Musculation.png"

const icons = [
    { src: Meditation, alt: "Méditation" },
    { src: Natation, alt: "Natation" },
    { src: Cyclisme, alt: "Cyclisme" },
    { src: Musculation, alt: "Musculation" },
]

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-icons">
                {icons.map((icon) => (
                    <button key={icon.alt} className="icon-btn">
                        <img src={icon.src} alt={icon.alt} />
                    </button>
                ))}
            </nav>
            <p className="sidebar-copyright">Copyright, SportSee 2020</p>
        </aside>
    )
}

export default Sidebar
