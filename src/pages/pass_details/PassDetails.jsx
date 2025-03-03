import { useMutation, useQuery, useQueryClient } from "react-query"
import Spinner from "../../components/UI/Spinner"
import { disactivateFreeCode, getFreePassQrCode } from "../../utils/api/authAPIs"
import { useLocation } from "react-router-dom"
import Button from "../../components/UI/Button"
import { useContext } from "react"
import { ToastContext } from "../../hooks/useToast"

export default function EGoPassCard() {

    const location = useLocation()
    const passId = location.state?.id
    const isDeleteble = location.state?.token
    
    const { openToast } = useContext(ToastContext)
    const queryClient = useQueryClient()
    const mutateKey = ['egoPasses']
    const queryKey = ['freePassQrCode']
    const { isLoading, data: pass, error } = useQuery(queryKey, async () => await getFreePassQrCode(passId))

    const { isLoading: disactivating, mutate, reset } = useMutation(async (token) => await disactivateFreeCode(token), {
        onSuccess: (mutatePass) => {
            queryClient.invalidateQueries(queryKey)
            queryClient.setQueryData(mutateKey, (passLis) => {
                try {
                    openToast({ message: "Pass désactivé" })
                    const newList = passLis.filter(pass => pass.id === mutatePass.id)
                    newList.unshift(mutatePass)
                    return newList
                } catch (error) {
                    openToast({ message: "Erreur de mise en cache", type: "failed" })
                }
            })
            reset()
        },
        onError: err => openToast({ message: err?.response?.data?.message || "Erreur inattendue", type: "failed" })
    })

    const handleDisactivate = () => {
        mutate(isDeleteble)
    }

    if (error) openToast({ message: "Erreur d'obtention du pass", type: "failed" })
    if (isLoading) return <Spinner otherClass='m-auto' />

    if (pass) {
        return <div className="agent_home container">
            <h2 className="text-center mb-4 text-secondary">E-GO PASS N° {pass.pass.id}</h2>
        
            <div className={`card hard_shadow border border-${pass.pass.status === 'ACTIVATED' ? "success" : "danger"}}`} style={{width: "18rem"}}>
                <img src={pass.qrCodeToDataUrl} className="img-fluid rounded-start" alt="free pass qr-code" />
                <div className="card-body">
                    <h5 className="card-title text-secondary">{pass.pass.amount > 0 ? "Pass Payant" : "Pass Gratuit"}</h5>
                    <p className="card-text">{pass.pass.amount > 0 ? "Ceci est un pass VIP permettant de voyager aisement ou bon vous semble" : "Ceci est un pass permettant de voyager gratuitement pour certaines destinations"}</p>
                    <p className={`card-text text-${pass.pass.status === 'ACTIVATED' ? "success" : "danger"}`}>{`PASS ${pass.pass.status === 'ACTIVATED' ? "ACTIF" : "DESACTIVE"}`}</p>
                    <p className="card-text"><small className="text-body-secondary">Valeur: {pass.pass.amount} Fcfa</small></p>
                </div>
            </div>

            {isDeleteble && <Button content={'Déactiver'} type="button" onClick={handleDisactivate} isLoading={disactivating} classList="disactivator" />}
        </div>
    }
}
