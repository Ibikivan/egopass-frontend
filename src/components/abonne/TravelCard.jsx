import { useNavigate } from "react-router-dom"

export default function TravelCard({ travel }) {

    const navigate = useNavigate()
    const handletravelClick = () => {
        navigate(`travel/${travel.id}`, { state: {id: travel.id} })
    }

    if (travel) {
        return <div onClick={handletravelClick} className={`card mb-3 border border-success`}>
            <div className="card-body hstack justify-content-between">
                <h5 className="card-title">{travel.destination}</h5>
                <p className={`card-text text-success`}>{travel.flyType}</p>
            </div>
        </div>
    }
}
