import { forwardRef, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { handleAnimCoplete, preventClickBehaviour } from "../../utils/helper";
import ScanInterface from "./ScanInterface";
import { useMutation } from "react-query";
import { scanQrCode } from "../../utils/api/authAPIs";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../hooks/useToast";

const coverVariants = {
    visible: {opacity: 1},
    hidden: {opacity: 0}
}

const bodyVariants = {
    visible: {y: 0, opacity: 1},
    hidden: {y: '-50%', opacity: 0}
}

export default forwardRef(function ScanCode({closeModal, isModalOpen}, ref) {

    const { openToast } = useContext(ToastContext)
    const tokenRef = useRef(null)
    const navigate = useNavigate()
    const { isLoading, mutate, reset } = useMutation(async (token) => await scanQrCode(token), {
        onSuccess: (pass) => {
            openToast({ message: "Code valide" })
            navigate('pass', { state: { id: pass?.pass?.id, token: tokenRef?.current } })
            reset()
        },
        onError: err => openToast({ message: err?.response?.data?.message || "Erreur inconnue", type: "failed" })
    })

    const handleScan = (result) => {
        if (result && result.length > 0 && result[0].rawValue) {
            const token = result[0].rawValue
            tokenRef.current = token
            mutate(token)
        }
    }

    const handleError = (error) => {
        openToast({ message: "Erreur de scan", type: "failed" })
    }

    return createPortal(<motion.div
        ref={ref}
        variants={coverVariants}
        animate={isModalOpen ? 'visible' : 'hidden'}
        onAnimationComplete={() => handleAnimCoplete(isModalOpen, ref)}
        className="modal modal_cover"
        tabIndex="-1"
        onClick={closeModal}
    >
        <motion.div
            variants={bodyVariants}
            animate={isModalOpen ? 'visible' : 'hidden'}
            className="modal-dialog modal_container"
            onClick={preventClickBehaviour}
        >
            <div className="modal-content h-100">
                <div className="modal-header">
                    <h5 className="modal-title">Scan du Qr-Code</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModal}
                    ></button>
                </div>
                <div className="modal-body">
                    {isModalOpen && <ScanInterface
                        onScan={handleScan}
                        onError={handleError}
                        isLoading={isLoading}
                    />}
                </div>
            </div>
        </motion.div>
    </motion.div>, document.body)
})
