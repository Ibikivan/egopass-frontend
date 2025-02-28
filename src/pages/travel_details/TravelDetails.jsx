import { useQuery } from "react-query"
import Spinner from "../../components/UI/Spinner"
import { getFreePassQrCode, getUserTravel } from "../../utils/api/authAPIs"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export default function TravelDetails() {

    const [getCode, setGetCode] = useState(false)
    const location = useLocation()
    const travelId = location.state.id
    const queryKey = ['travel']
    const codeQueryKey = ['freePassQrCode']
    const { isLoading, data: travel, error } = useQuery(queryKey, async () => await getUserTravel(travelId))
    const { isLoading: fetching, data: pass, error: unfetched } = useQuery(codeQueryKey, async () => await getFreePassQrCode(travel?.freePass.id), {
        enabled: getCode
    })

    useEffect(() => {
        if (travel) {
            setGetCode(true)
        }
    }, [travel])

    if (isLoading) return <Spinner otherClass='m-auto' />

    if (travel) {
        return <div className="agent_home container">
            <h2 className="text-center mb-4 text-secondary">Voyage N° {travel.id}</h2>

            {fetching ? (
                <Spinner otherClass="m-auto" />
            ) : (
                pass && (<div className={`card border border-${travel.freePass.status === 'ACTIVATED' ? "success" : "danger"}`} style={{width: "18rem"}}>
                    <img src={pass.qrCodeToDataUrl} className="img-fluid rounded-start" alt="free travel qr-code" />
                </div>)
            )}

            <div className={`card border border-${travel.freePass.status === 'ACTIVATED' ? "success" : "danger"}`} style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title text-secondary">Vol de type: {travel.flyType}</h5>
                    <p className="card-text">Pour: {travel.destination}</p>
                    <p className={`card-text`}>En provenance de: {travel.provenance}</p>
                    <p className="card-text"><small className="text-body-secondary">Numero vol: {travel.flyNumber}</small></p>
                </div>
            </div>
        </div>
    }
}
