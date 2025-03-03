import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import LogoUI from '../../components/UI/Logo';
import logo from './../../assets/eGo-Pass_logo.png';
import {
    getUserByEmail,
    sendOtpRequest,
    verifyOtp,
    resetPasswordApi
} from '../../utils/api/authAPIs';
import EmailInputStep from '../../components/forgotPassword/EmailInputStep';
import MethodSelectionStep from '../../components/forgotPassword/MethodSelectionStep';
import OTPVerificationStep from '../../components/forgotPassword/OTPVerificationStep';
import NewPasswordStep from '../../components/forgotPassword/NewPasswordStep';
import { usePageTitle } from '../../hooks';
import { getIdentifier } from '../../utils/helper';
import { ToastContext } from '../../hooks/useToast';

export default function ForgotPassword() {
    const pageConfig = { title: "Réinitialisation du mot de passe" };
    const { openToast } = useContext(ToastContext);
    usePageTitle(pageConfig.title);
    const navigate = useNavigate();

    const [step, setStep] = useState("email"); // "email", "method", "otp", "newPassword"
    const [userData, setUserData] = useState(null);
    const [method, setMethod] = useState(null);

    // Étape 1 : Vérification de l'existence de l'utilisateur
    const { mutate: checkUser, isLoading: checkingUser } = useMutation(getUserByEmail, {
        onSuccess: (data) => {
            if (!data) {
                openToast({ message: "Utilisateur trouvé" });
                return;
            }
            setUserData(data);
            setStep("method");
        },
        onError: (error) => openToast({ message: error?.response?.data?.message || "Utilisateur non trouvé", type: "failed" })
    });

    // Étape 2 : Envoi du code OTP
    const { mutate: sendOtp, isLoading: sendingOtp } = useMutation(sendOtpRequest, {
        onSuccess: () => {
            setStep("otp");
        },
        onError: (error) => openToast({ message: error?.response?.data?.message || "Erreur d'envoi du code", type: "failed" })
    });

    // Étape 3 : Vérification du code OTP
    const { mutate: verifyOtpMutation, isLoading: verifyingOtp } = useMutation(verifyOtp, {
        onSuccess: () => {
            setStep("newPassword");
        },
        onError: (error) => openToast({ message: error?.response?.data?.message || "Code OTP invalide", type: "failed" })
    });

    // Étape 4 : Réinitialisation du mot de passe
    const { mutate: resetPasswordMutation, isLoading: resettingPassword } = useMutation(resetPasswordApi, {
        onSuccess: () => {
            openToast({ message: error?.response?.data?.message || "Mot de passe réinitialisé" })
            navigate('/login');
        },
        onError: (error) => openToast({ message: error?.response?.data?.message || "Erreur de réinitialisation", type: "failed" })
    });

    const handleEmailSubmit = (email) => {
        checkUser(email);
    };

    const handleMethodSelect = (selectedMethod) => {
        setMethod(selectedMethod);
        const identifier = getIdentifier(selectedMethod, userData)
        sendOtp({ identifier });
    };

    const handleOtpSubmit = (enteredOtp) => {
        const identifier = getIdentifier(method, userData)
        verifyOtpMutation({ identifier, providedCode: enteredOtp });
    };

    const handleNewPasswordSubmit = (newPassword, confirmPassword) => {
        if (newPassword !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        const identifier = getIdentifier(method, userData)
        resetPasswordMutation({ identifier, newPassword });
    };

    return (
        <div className="vstack" style={{ minHeight: '100vh' }}>
            <div className="login_header">
                <LogoUI name="eGoPass" source={logo} width={200} height={100} translate={50} classList="m-auto" />
            </div>
            <div className="login_card_container">
                <AnimatePresence exitBeforeEnter>
                    {step === "email" && (
                        <motion.div key="emailStep" className='standard_card' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
                            <EmailInputStep onSubmit={handleEmailSubmit} isLoading={checkingUser} />
                        </motion.div>
                    )}
                    {step === "method" && userData && (
                        <motion.div key="methodStep" className='standard_card' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
                            <MethodSelectionStep userData={userData} onSelectMethod={handleMethodSelect} isLoading={sendingOtp} />
                        </motion.div>
                    )}
                    {step === "otp" && (
                        <motion.div key="otpStep" className='standard_card' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
                            <OTPVerificationStep onSubmit={handleOtpSubmit} isLoading={verifyingOtp} />
                        </motion.div>
                    )}
                    {step === "newPassword" && (
                        <motion.div key="newPasswordStep" className='standard_card' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
                            <NewPasswordStep onSubmit={handleNewPasswordSubmit} isLoading={resettingPassword} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
