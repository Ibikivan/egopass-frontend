import { useEffect, useRef, useState } from 'react'
import camera from '../../assets/camera.svg'
import { motion } from 'framer-motion'
import { handleScroll } from '../../utils/helper'
import ScanCode from './ScanCode'

const buttonVariants = {
    visible: {rotate: 0, opacity: 1, scale: 1},
    hidden: {rotate: 180, opacity: 0, scale: .8}
}

export default function QrCodeScanner({footerRef}) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalRef = useRef(null)
    const buttonRef = useRef(null)

    function toggleIsModalOpen() {
        if (!isModalOpen) {
            modalRef.current.style.display = 'block'
        }

        setIsModalOpen(isOpen => !isOpen)
    }

    useEffect(() => {
        if (footerRef && buttonRef) {
            window.addEventListener('scroll', () => handleScroll(footerRef.current, buttonRef.current, 100))

            return () => {
                window.removeEventListener('scroll', () => handleScroll(footerRef.current, buttonRef.current, 100))
            }
        }
    }, [])

    return <div>
        <motion.button
            ref={buttonRef}
            title='Sanner un QR-Code'
            variants={buttonVariants}
            animate={isModalOpen ? 'hidden' : 'visible'}
            whileHover={{scale: 1.03}}
            className='scan_code'
            onClick={toggleIsModalOpen}
        >
            <img src={camera} alt="add icon" />
        </motion.button>

        <ScanCode closeModal={toggleIsModalOpen} ref={modalRef} isModalOpen={isModalOpen} />
    </div>
}
