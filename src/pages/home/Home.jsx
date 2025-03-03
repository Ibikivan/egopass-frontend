import { useContext } from "react";
import Abonne from "../../components/abonne";
import AgentRVA from "../../components/agentRVA";
import { getEgoPasses, getUserTravels } from "../../utils/api/authAPIs";
import { Link } from "react-router-dom";
import { ProfilContext } from "../../hooks/useProfil";

export default function Home({ footerRef }) {

    const pageConfig = {
        roles: {
            AGENT_RVA: {
                key: ['egoPasses'],
                getter: getEgoPasses,
                title: 'Liste des e-GoPass'
            },
            ABONNE: {
                key: ['travels'],
                getter: getUserTravels,
                title: 'Vos voyages'
            },
        }
    }

    const { userProfile } = useContext(ProfilContext)
    const userRole = userProfile?.user?.role || "ABONNE"
    
    if (!pageConfig.roles[userRole]) {
        return <div className="container py-5">
            <h1 className="secondary">Vous n'avez pas accès à cette page</h1>

            <div className="hstack justify-content-between">
                <Link to={'/'}>Retour à l'accueille</Link>
                <Link to={'/login'}>Changer de compte</Link>
            </div>
        </div>
    }

    return <div className="container fullHeight vstack align-items-center">
        {userRole === 'AGENT_RVA' && <AgentRVA
            queryKey={pageConfig.roles[userRole]?.key}
            getter={pageConfig.roles[userRole]?.getter}
            title={pageConfig.roles[userRole]?.title}
            profilLoading={userProfile?.user?.isLoading}
            footerRef={footerRef}
        />}
        {userRole === 'ABONNE' && <Abonne
            queryKey={pageConfig.roles[userRole]?.key}
            getter={pageConfig.roles[userRole]?.getter}
            title={pageConfig.roles[userRole]?.title}
            profilLoading={userProfile?.user?.isLoading}
            footerRef={footerRef}
        />}
    </div>
}
