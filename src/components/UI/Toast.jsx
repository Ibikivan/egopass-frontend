import { motion } from 'framer-motion'
import checkIcon from '../../assets/check.svg'
import circleCrossIcon from '../../assets/circle-press.svg'
import closeIcon from '../../assets/close.svg'
import closeSuccessIcon from '../../assets/close-success.svg'
import { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../../hooks/useToast'

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

export default function Toast({ message="SUCCESS", type='success', delay=3000, onClose=()=>null }) {
    const config = {
        success: {
            icon: checkIcon,
            close: closeSuccessIcon,
            classTag: "success"
        },
        failled: {
            icon: circleCrossIcon,
            close: closeIcon,
            classTag: "danger"
        }
    }

    const { isToastOpen, closeToast } = useContext(ToastContext)
    const [openToast, setopenToast] = useState(false)

    useEffect(() => {
        if (isToastOpen) setopenToast(true)
        const preToastTimeout = setTimeout(() => {
            setopenToast(false)
        }, delay)
        const toastTimeout = setTimeout(() => {
            closeToast()
        }, delay + 1000)

        return () => {
            clearTimeout(preToastTimeout)
            clearTimeout(toastTimeout)
        }
    }, [isToastOpen])

    return <motion.div
        className={`toast_container toast_${config[isToastOpen?.type || type].classTag} border border-${config[isToastOpen?.type || type].classTag}`}
        variants={wrapperVariants}
        animate={openToast ? 'visible' : 'hidden'}
    >
        <motion.img src={config[isToastOpen?.type || type].icon} alt="check icon" variants={iconVariants} />
        <motion.p variants={messageVariants}>{isToastOpen?.message || message}</motion.p>
        <img src={config[isToastOpen?.type || type].close} alt={`close ${isToastOpen?.type || type}`} className='close_toast' />
    </motion.div>
}
