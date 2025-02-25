import { useQuery } from "react-query"
import { getLogedUser } from "../../utils/api/authAPIs"
import { usePageTitle } from "../../hooks"
import { hostUriADapter } from "../../utils/helper"
import { Link } from "react-router-dom"
import editIcon from "../../assets/pencil-square.svg"

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
    const queryKey = ['user']
    const { isLoading, data: user, error } = useQuery(queryKey, async () => getLogedUser())

    // if (isLoading) return <Spinner otherClass='m-auto' />
    if (isLoading) return <div className="full_page_spinner"><Spinner otherClass='m-auto' /></div>

    if (user) {
        return <div className="agent_home container">
            <h2 className="text-center text-secondary mb-4">Mon profil utilisateur</h2>

            <div className="profil_container">
                <img src={hostUriADapter(user.profilePicture)} class="img-thumbnail wild_profile_picture" alt={`${user.username} profile picture`} />
                <Link to="/edit-profil" title="Modifier le profil">
                    <img src={editIcon} alt="edit icon" width={30} height={30} />
                </Link>
            </div>

            <div class="card user_info_card">
                <div class="card-header">
                    Informations personnelles
                </div>
                <div class="card-body blur_effect">
                    <h5 class="card-title">Nom d'utilisateur</h5>
                    <p class="card-text mx-4">{user.username}</p>

                    <h5 class="card-title">Prénom</h5>
                    <p class="card-text mx-4">{user.firstName}</p>

                    <h5 class="card-title">Nom</h5>
                    <p class="card-text mx-4">{user.lastName}</p>
                </div>
            </div>

            <div class="card user_info_card">
                <div class="card-header">
                    Contacs
                </div>
                <div class="card-body blur_effect">
                    <h5 class="card-title">Adresse de messagerie</h5>
                    <p class="card-text mx-4">{user.email}</p>

                    <h5 class="card-title">Numero de téléphone</h5>
                    <p class="card-text mx-4">{user.phoneNumber}</p>
                </div>
            </div>

            <div class="card user_info_card">
                <div class="card-header">
                    Informations fonctionnelles
                </div>
                <div class="card-body blur_effect">
                    <h5 class="card-title">Permissions</h5>
                    <p class="card-text mx-4">{user.role}</p>

                    {(user.role === "AGENT_RVA" || user.role === "ADMIN" || user.role === "SUPER_ADMIN") && <>
                        <h5 class="card-title">nom du post</h5>
                        <p class="card-text mx-4">{user[pageConfig.roles[user.role].caled].postNom}</p>
                    </>}

                    {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && <>
                        <h5 class="card-title">Fonction</h5>
                        <p class="card-text mx-4">{user[pageConfig.roles[user.role].caled].fonction}</p>
                    </>}

                    {(user.role === "AGENT_RVA" || user.role === "ADMIN" || user.role === "SUPER_ADMIN") && <>
                        <h5 class="card-title">Compagnie</h5>
                        <p class="card-text mx-4">{user[pageConfig.roles[user.role].caled].workplace}</p>
                    </>}
                </div>
            </div>
        </div>
    }
}
