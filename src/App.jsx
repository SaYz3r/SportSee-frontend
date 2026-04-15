import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Profile from "./pages/Profile"
import "./index.css"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/user/12" replace />} />
                <Route path="/user/:userId" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
