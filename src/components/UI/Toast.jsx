import { motion } from 'framer-motion'
import checkIcon from '../../assets/check.svg'
import circleCrossIcon from '../../assets/circle-press.svg'
import closeIcon from '../../assets/close.svg'
import closeSuccessIcon from '../../assets/close-success.svg'
import { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../../hooks/useToast'
import { createPortal } from 'react-dom'

const wrapperVariants = {
    hidden: { y: '-500px', x: '-50%', transition: { when: 'afterChildren' } },
    visible: { y: 0, x: '-50%', transition: { when: 'beforeChildren' } },
}
const iconVariants = {
    hidden: { display: 'none' },
    visible: { display: '' }
}
const messageVariants = {
    hidden: { display: 'none' },
    visible: { display: '' }
}

export default function Toast({ message="SUCCESS", type='success', delay=3000, onClose }) {
    const config = {
        success: {
            icon: checkIcon,
            close: closeSuccessIcon,
            classTag: "success"
        },
        failed: {
            icon: circleCrossIcon,
            close: closeIcon,
            classTag: "danger"
        }
    }

    const { toast, closeToast } = useContext(ToastContext)

    useEffect(() => {
        let toastTimeout
        if (toast?.isOpen) {
            toastTimeout = setTimeout(() => {
                closeToast()
            }, delay + 1000)
        }
        return () => {
            clearTimeout(toastTimeout)
        }
    }, [toast?.isOpen])

    return createPortal(<motion.div
        className={`toast_container toast_${config[toast?.data?.type || type].classTag} border border-${config[toast?.data?.type || type].classTag}`}
        variants={wrapperVariants}
        animate={toast.isOpen ? 'visible' : 'hidden'}
    >
        <motion.img src={config[toast?.data?.type || type].icon} alt="check icon" variants={iconVariants} />
        <motion.p variants={messageVariants}>{toast?.data?.message || message}</motion.p>
        <img
            src={config[toast?.data?.type || type].close}
            alt={`close ${toast?.data?.type || type}`}
            className='close_toast'
            onClick={closeToast || onClose}
        />
    </motion.div>, document.body)
}
