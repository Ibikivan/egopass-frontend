import { getEgoPasses, getUserTravels } from "../../utils/api/authAPIs";
import { Link } from "react-router-dom";
import AgentRVA from "../../components/agentRVA";
import Abonne from "../../components/abonne";

export default function Home() {

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
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    const userRole = currentUser?.role;
    
    if (!pageConfig.roles[userRole]) {
        return <div>
            <h1>Vous n'avez pas accès à cette page</h1>
            <Link to={'/'}>Retour à l'accueille</Link>
            <Link to={'/login'}>Changer de compte</Link>
        </div>
    }

    return <div className="container fullHeight vstack align-items-center">
        {userRole === 'AGENT_RVA' && <AgentRVA
            queryKey={pageConfig.roles[userRole]?.key}
            getter={pageConfig.roles[userRole]?.getter}
            title={pageConfig.roles[userRole]?.title}
        />}
        {userRole === 'ABONNE' && <Abonne
            queryKey={pageConfig.roles[userRole]?.key}
            getter={pageConfig.roles[userRole]?.getter}
            title={pageConfig.roles[userRole]?.title}
        />}
    </div>
}
