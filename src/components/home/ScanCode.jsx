import { forwardRef, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { handleAnimCoplete, preventClickBehaviour } from "../../utils/helper";
import ScanInterface from "./ScanInterface";

const coverVariants = {
    visible: {opacity: 1},
    hidden: {opacity: 0}
}

const bodyVariants = {
    visible: {y: 0, opacity: 1},
    hidden: {y: '-50%', opacity: 0}
}

export default forwardRef(function ScanCode({closeModal, isModalOpen}, ref) {

    const id = useId()
    const formRef = useRef(null)

    const handleCancled = () => {
        closeModal()
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
                    <ScanInterface
                        onScan={(data) => {
                            console.log("QR Code scanné :", data)
                            closeModal()
                        }}
                        onError={(err) => {
                            console.log("erreur de scan", err)
                        }}
                    />
                </div>
                {/* <div className="modal-footer d-flex">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={handleCancled}
                    >Annuler</button>
                    <button
                        type="submit" form={id}
                        className="btn btn-primary"
                    >Ajouter</button>
                </div> */}
            </div>
        </motion.div>
    </motion.div>, document.body)
})
