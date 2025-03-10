import { useQuery } from "react-query"
import { getLogedUser } from "../../utils/api/authAPIs"
import { usePageTitle } from "../../hooks"
import { hostUriADapter } from "../../utils/helper"
import { Link } from "react-router-dom"
import editIcon from "../../assets/pencil-square.svg"
import defaultPicture from '../../assets/defaultPicture.svg'
import { useContext } from "react"
import { ToastContext } from "../../hooks/useToast"

export default function Profil() {

    const pageConfig = {
        title: "eGo-Pass Profil utilisateur",
        roles: {
            AGENT_RVA: {
                caled: 'agentRVA'
            },
            ADMIN: {
                caled: 'admin'
            },
            SUPER_ADMIN: {
                caled: 'superAdmin'
            }
        }
    }
    usePageTitle(pageConfig.title)
    const { openToast } = useContext(ToastContext)
    const queryKey = ['user']
    const { isLoading, data: user, error } = useQuery(queryKey, async () => getLogedUser())

    if (error) openToast({ message: "Echec d'obtention du profil", type: "failed" })
    if (isLoading) return <div className="full_page_spinner"><Spinner otherClass='m-auto' /></div>

    if (user) {
        return <div className="agent_home container">
            <h2 className="text-center text-secondary mb-4">Mon profil utilisateur</h2>

            <div className="profil_container">
                <img src={hostUriADapter(user.profilePicture) || defaultPicture} className="img-thumbnail wild_profile_picture" alt={`${user.username} profile picture`} />
                <Link to="/edit-profil" title="Modifier le profil">
                    <img src={editIcon} alt="edit icon" width={30} height={30} />
                </Link>
            </div>

            <div className="card user_info_card">
                <div className="card-header">
                    Informations personnelles
                </div>
                <div className="card-body blur_effect">
                    <h5 className="card-title">Nom d'utilisateur</h5>
                    <p className="card-text mx-4">{user.username}</p>

                    <h5 className="card-title">Prénom</h5>
                    <p className="card-text mx-4">{user.firstName}</p>

                    <h5 className="card-title">Nom</h5>
                    <p className="card-text mx-4">{user.lastName}</p>
                </div>
            </div>

            <div className="card user_info_card">
                <div className="card-header">
                    Contacs
                </div>
                <div className="card-body blur_effect">
                    <h5 className="card-title">Adresse de messagerie</h5>
                    <p className="card-text mx-4">{user.email}</p>

                    <h5 className="card-title">Numero de téléphone</h5>
                    <p className="card-text mx-4">{user.phoneNumber}</p>
                </div>
            </div>

            <div className="card user_info_card">
                <div className="card-header">
                    Informations fonctionnelles
                </div>
                <div className="card-body blur_effect">
                    <h5 className="card-title">Permissions</h5>
                    <p className="card-text mx-4">{user.role}</p>

                    {(user.role === "AGENT_RVA" || user.role === "ADMIN" || user.role === "SUPER_ADMIN") && <>
                        <h5 className="card-title">nom du post</h5>
                        <p className="card-text mx-4">{user[pageConfig.roles[user.role].caled].postNom}</p>
                    </>}

                    {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && <>
                        <h5 className="card-title">Fonction</h5>
                        <p className="card-text mx-4">{user[pageConfig.roles[user.role].caled].fonction}</p>
                    </>}

                    {(user.role === "AGENT_RVA" || user.role === "ADMIN" || user.role === "SUPER_ADMIN") && <>
                        <h5 className="card-title">Compagnie</h5>
                        <p className="card-text mx-4">{user[pageConfig.roles[user.role].caled].workplace}</p>
                    </>}
                </div>
            </div>
        </div>
    }
}
