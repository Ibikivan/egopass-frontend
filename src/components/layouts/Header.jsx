import LogoUI from "../UI/Logo"
import logo from "../../assets/eGo-Pass_logo.png"
import { hostUriADapter } from "../../utils/helper"
import { Link, useNavigate } from "react-router-dom"
import defaultPicture from '../../assets/defaultPicture.svg'
import Button from "../UI/Button"
import logOut from "../../assets/logOutIcon.svg"
import { useMutation, useQuery } from "react-query"
import { logOutUser } from "../../utils/api/authAPIs"
import { useEffect, useState } from "react"

export default function Header({ userInfo }) {
    const { userName, picture, isOnline } = userInfo

    const navigate = useNavigate()
    const { isLoading, mutate } = useMutation(async () => logOutUser(), {
        onSuccess: () => {
            console.log('mutate')
            navigate('/login')
        },
        onError: err => console.log(err)
    })

    return <header>
        <div className="header_skirt">
            <div className="login_header soft_shadow">
                <LogoUI name={'eGoPass'} source={logo} width={200} height={100} translate={50} />

                <div className="hstack gap-2">
                    <p>{userName}</p>
                    <Link to={'profil'} title="Consulter mon profil" className="position-relative" style={{marginRight: "1em"}}>
                        <img src={picture ? hostUriADapter(picture) : defaultPicture} className="img-thumbnail profile_picture" alt={`${userName} profile picture`} />
                        <div className={`${isOnline ? 'bg-success' : 'bg-danger'} online_status`}></div>
                    </Link>
                    <Button content={
                        <img src={logOut} width={25} height={25} />
                    } classList="logout bg-secondary" onClick={mutate} isLoading={isLoading} />
                </div>
            </div>
        </div>
    </header>
}
