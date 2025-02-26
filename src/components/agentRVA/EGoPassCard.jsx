import { useNavigate } from "react-router-dom"

export default function EGoPassCard({ pass }) {

    const navigate = useNavigate()
    const handlePassClick = () => {
        navigate(`${pass.id}`, { state: {id: pass.id} })
    }

    if (pass) {
        return <div onClick={handlePassClick} className={`card mb-3 border pass_selector border-${pass.status === 'ACTIVATED' ? "success" : "danger"}`}>
            <div className="card-body hstack justify-content-between">
                <h5 className="card-title">{pass.amount > 0 ? "Pass Payant" : "Pass Gratuit"}</h5>
                <p className={`card-text text-${pass.status === 'ACTIVATED' ? "success" : "danger"}`}>{`PASS ${pass.status === 'ACTIVATED' ? "ACTIF" : "DESACTIVE"}`}</p>
            </div>
        </div>
    }
}
