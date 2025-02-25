import { useQuery } from "react-query"
import Spinner from "../../components/UI/Spinner"
import { getFreePassQrCode } from "../../utils/api/authAPIs"
import { useLocation } from "react-router-dom"

export default function EGoPassCard() {

    const location = useLocation()
    const passId = location.state.id
    
    const queryKey = ['freePassQrCode']
    const { isLoading, data: pass, error } = useQuery(queryKey, async () => await getFreePassQrCode(passId))

    if (isLoading) return <Spinner otherClass='m-auto' />

    if (pass) {
        return <div className="agent_home container">
            <h2 className="text-center mb-4 text-secondary">E-GO PASS N° {pass.pass.id}</h2>
        
            <div className={`card border border-${pass.pass.status === 'ACTIVATED' ? "success" : "danger"}}`} style={{width: "18rem"}}>
                <img src={pass.qrCodeToDataUrl} className="img-fluid rounded-start" alt="free pass qr-code" />
                <div className="card-body">
                    <h5 className="card-title text-secondary">{pass.pass.amount > 0 ? "Pass Payant" : "Pass Gratuit"}</h5>
                    <p className="card-text">{pass.pass.amount > 0 ? "Ceci est un pass VIP permettant de voyager aisement ou bon vous semble" : "Ceci est un pass permettant de voyager gratuitement pour certaines destinations"}</p>
                    <p className={`card-text text-${pass.pass.status === 'ACTIVATED' ? "success" : "danger"}`}>{`PASS ${pass.pass.status === 'ACTIVATED' ? "ACTIF" : "DESACTIVE"}`}</p>
                    <p className="card-text"><small className="text-body-secondary">Valeur: {pass.pass.amount} Fcfa</small></p>
                </div>
            </div>
        </div>
    }
}
