import LogoUI from "../UI/Logo"
import logo from "../../assets/eGo-Pass_logo.png"
import { hostUriADapter } from "../../utils/helper"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Header({ userInfo }) {
    const { userName, picture, isOnline } = userInfo

    return <header>
        <div className="login_header">
            <LogoUI name={'eGoPass'} source={logo} width={200} height={100} translate={50} />

            <div className="hstack gap-2">
                <p>{userName}</p>
                <Link to={'profil'} title="Consulter mon profil" className="position-relative">
                    <img src={picture ? hostUriADapter(picture) : "http://localhost:3000/uploads/profilePictures/profilePicture-1740577835889-226119297.svg"} className="img-thumbnail profile_picture" alt={`${userName} profile picture`} />
                    <div className={`${isOnline ? 'bg-success' : 'bg-danger'} online_status`}></div>
                </Link>
            </div>
        </div>
    </header>
}
