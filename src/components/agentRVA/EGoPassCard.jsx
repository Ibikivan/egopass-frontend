import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function EGoPassCard({ pass }) {

    const navigate = useNavigate()
    const handlePassClick = () => {
        navigate('pass', { state: {id: pass.id} })
    }

    if (pass) {
        return <motion.div
            onClick={handlePassClick}
            className={`card mb-3 hard_shadow border pass_selector border-${pass.status === 'ACTIVATED' ? "success" : "danger"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className="card-body hstack justify-content-between">
                <h5 className="card-title">{pass.amount > 0 ? "Pass Payant" : "Pass Gratuit"}</h5>
                <p className={`card-text text-${pass.status === 'ACTIVATED' ? "success" : "danger"}`}>{`PASS ${pass.status === 'ACTIVATED' ? "ACTIF" : "DESACTIVE"}`}</p>
            </div>
        </motion.div>
    }
}
