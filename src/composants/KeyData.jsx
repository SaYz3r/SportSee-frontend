import "../styles/KeyData.css"
import { KEY_DATA_CONFIG } from "../constants/keyDataConfig.js"

function KeyData({ keyData }) {
    return (
        <aside className="keydata-list">
            {KEY_DATA_CONFIG.map(({ key, icon, label, color, format }) => (
                <div
                    key={key}
                    className="keydata-card"
                    style={{ "--keydata-color": color }}
                >
                    <div className="keydata-icon">
                        <img src={icon} alt={label} />
                    </div>
                    <div className="keydata-info">
                        <span className="keydata-value">
                            {format(keyData[key])}
                        </span>
                        <span className="keydata-label">{label}</span>
                    </div>
                </div>
            ))}
        </aside>
    )
}

export default KeyData
