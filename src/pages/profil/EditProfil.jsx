import { useMutation, useQuery, useQueryClient } from "react-query"
import { usePageTitle } from "../../hooks"
import { getLogedUser, updateProfile } from "../../utils/api/authAPIs"
import Spinner from "../../components/UI/Spinner"
import { hostUriADapter } from "../../utils/helper"
import { useState } from "react"
import Button from "../../components/UI/Button"
import { Link, useNavigate } from "react-router-dom"

export default function EditProfil() {

    const pageConfig = {
        title: "eGo-Pass Mise à jour du profil",
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
    const navigate = useNavigate()
    const queryKey = ['user']
    const { isLoading, data: user, error } = useQuery(queryKey, async () => getLogedUser())
    const [peview, setPreview] = useState(hostUriADapter(user.profilePicture))
    const [file, setFile] = useState(null)

    const {isLoading: updating, mutate, error: unUpdated, reset} = useMutation(async data => await updateProfile(data), {
        onSuccess: (user) => {
            navigate('/profil')
            reset()
        },
        onError: (err) => {
            throw new Error(err)
        }
    })

    // if (isLoading) return <Spinner otherClass='m-auto' />
    if (isLoading) return <div className="full_page_spinner"><Spinner otherClass='m-auto' /></div>

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl);
            setFile(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const profilData = Object.fromEntries(formData.entries())
        if (file) {
            formData.append('profilePicture', file)
            profilData.profilePicture = file
        }
        mutate(formData)
    }

    if (user) {
        return <div className="agent_home container">
            <h2 className="text-center text-secondary mb-4">Edition de profil</h2>

            <form onSubmit={handleSubmit} className="edti_profil_form">
                <fieldset>
                    <legend>Ajoutez une photo de profile</legend>
                    <div className="d-flex justify-content-center">
                        <label htmlFor="profilePictureInput" style={{ cursor: 'pointer' }}>
                            <img
                                src={peview || "http://localhost:3000/uploads/profilePictures/profilePicture-1740577835889-226119297.svg"}
                                className="img-thumbnail wild_profile_picture"
                                alt="Aperçu de la photo de profil"
                            />
                        </label>
                        <input
                            type="file"
                            id="profilePictureInput"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Informations personnelles</legend>
                    <div class="mb-3">
                        <label for="username" class="form-label">Nom d'utilisateur</label>
                        <input type="text" name="username" placeholder="Votre nom d'utilisateur" defaultValue={user.username} class="form-control" id="username" />
                    </div>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">Prénom</label>
                        <input type="text" name="firstName" placeholder="Votre prénom" defaultValue={user.firstName}  class="form-control" id="firstName" />
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Nom</label>
                        <input type="text" name="lastName" placeholder="Votre nom" defaultValue={user.lastName} class="form-control" id="lastName" />
                    </div>
                    <Link to="/forgot-password">Changer de mot de passe ?</Link>
                </fieldset>

                <fieldset>
                    <legend>Contacs</legend>
                    <div class="mb-3">
                        <label for="email" class="form-label">Adresse de messagerie</label>
                        <input type="email" name="email" placeholder="Votre adresse email" defaultValue={user.email} class="form-control" id="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">Nous ne partagerons votre email avec personne d'autres.</div>
                    </div>
                    <div class="mb-3">
                        <label for="phoneNumber" class="form-label">Numero de téléphone</label>
                        <input type="text" name="phoneNumber" placeholder="Votre numéro de téléphone" defaultValue={user.phoneNumber} class="form-control" id="phoneNumber" />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Informations fonctionnelles</legend>
                    {(user.role === "AGENT_RVA" || user.role === "ADMIN" || user.role === "SUPER_ADMIN") && 
                        <div class="mb-3">
                            <label for="postNom" class="form-label">nom du post</label>
                            <input type="text" name="postNom" placeholder="Votre nom de poste" defaultValue={user[pageConfig.roles[user.role].caled].postNom} class="form-control" id="postNom" />
                        </div>
                    }
                    {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && 
                        <div class="mb-3">
                            <label for="fonction" class="form-label">Fonction</label>
                            <input type="text" name="fonction" placeholder="Votre fonction" defaultValue={user[pageConfig.roles[user.role].caled].fonction} class="form-control" id="fonction" />
                        </div>
                    }
                    {(user.role === "AGENT_RVA" || user.role === "ADMIN" || user.role === "SUPER_ADMIN") && 
                        <div class="mb-3">
                            <label for="workplace" class="form-label">Compagnie</label>
                            <input type="text" name="workplace" placeholder="Votre compagnie d'attache" defaultValue={user[pageConfig.roles[user.role].caled].workplace} class="form-control" id="workplace" />
                        </div>
                    }
                </fieldset>
                
                <Button content={"Modifier"} isLoading={updating} />
            </form>
        </div>
    }
}
