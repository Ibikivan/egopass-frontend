import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function TravelCard({ travel }) {

    const navigate = useNavigate()
    const handletravelClick = () => {
        navigate('travel', { state: {id: travel.id} })
    }

    if (travel) {
        return <motion.div
            onClick={handletravelClick}
            className={`card mb-3 hard_shadow border border-${travel.freePass?.status === 'ACTIVATED' ? 'success' : 'danger'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className="card-body hstack justify-content-between">
                <h5 className="card-title">{travel.destination}</h5>
                <p className={`card-text text-success`}>{travel.flyType}</p>
            </div>
        </motion.div>
    }
}
