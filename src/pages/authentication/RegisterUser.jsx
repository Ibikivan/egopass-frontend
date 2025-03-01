// src/pages/authentication/Register.jsx
import { motion } from 'framer-motion';
import { usePageTitle } from '../../hooks';
import LogoUI from '../../components/UI/Logo';
import InputText from '../../components/UI/InputText';
import Button from '../../components/UI/Button';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { registerAbonne, registerAdmin, registerAgent } from '../../utils/api/authAPIs';
import logo from './../../assets/eGo-Pass_logo.png';
import eyeIcon from '../../assets/eye.svg';
import eyeSlashedIcon from '../../assets/eye-slash.svg';
import { useState } from 'react';

export default function RegisterUser() {
    const pageConfig = {
        title: "Créer un compte eGoPass",
        roles: {
            ADMIN: {
                getter: registerAgent
            },
            SUPER_ADMIN: {
                getter: registerAdmin
            },
        }
    }
    const navigate = useNavigate();
    usePageTitle(pageConfig.title);
    const [isPwdVisible, setIsPwdVisible] = useState(false)

    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    const userRole = currentUser?.role;

    const usedGetter = pageConfig.roles[userRole] ? pageConfig.roles[userRole].getter : registerAbonne
    const { isLoading, mutate: registerUser, reset } = useMutation(
        async (userData) => await usedGetter(userData),
        {
        onSuccess: (user) => {
            reset();
            navigate('/login');
        },
        onError: (err) => console.log(err)
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const registerData = Object.fromEntries(formData.entries());
        if (registerData.password !== registerData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        if (!registerData.phoneNumber.startsWith("237")) {
            registerData.phoneNumber = `237${registerData.phoneNumber}`;
        }
        delete registerData["confirmPassword"];
        registerUser(registerData);
    };

    const togglePwdVisible = () => {
        setIsPwdVisible(!isPwdVisible)
    }

    return <div className='vstack' style={{ minHeight: '100vh' }}>
        <div className="login_header">
            <LogoUI name="eGoPass" source={logo} width={200} height={100} translate={50} classList="m-auto" />
        </div>
        
        <div className="login_card_container">
            <motion.div 
                className="card p-4 shadow-sm standard_card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
            <h3 className="text-center mb-4 text-secondary">Créer un compte</h3>
            <form onSubmit={handleSubmit}>
                <InputText
                    containerClasses="mb-3"
                    id="username"
                    name="username"
                    label="Nom d'utilisateur"
                    placeholder="Votre nom d'utilisateur"
                    required={true}
                />
                <InputText
                    containerClasses="mb-3"
                    id="firstName"
                    name="firstName"
                    label="Prénom"
                    placeholder="Votre prénom"
                    required={true}
                />
                <InputText
                    containerClasses="mb-3"
                    id="lastName"
                    name="lastName"
                    label="Nom"
                    placeholder="Votre nom"
                    required={true}
                />
                <InputText
                    containerClasses="mb-3"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Votre adresse email"
                    required={true}
                />
                <InputText
                    containerClasses="mb-3"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Téléphone"
                    placeholder="Votre numéro de téléphone"
                    required={true}
                />
                <div className='position-relative'>
                    <InputText
                        containerClasses="mb-3"
                        id="password"
                        name="password"
                        label="Mot de passe"
                        type={isPwdVisible ? 'text' : 'password'}
                        placeholder="Votre mot de passe"
                        required={true}
                    />
                    {isPwdVisible
                        ? <img src={eyeSlashedIcon} onClick={togglePwdVisible} alt='eye slashed icon' className='pwd_eye_icon' />
                        : <img src={eyeIcon} onClick={togglePwdVisible} alt='eye icon' className='pwd_eye_icon' />
                    }
                </div>
                <div className="position-relative">
                    <InputText
                        containerClasses="mb-3"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirmer le mot de passe"
                        type={isPwdVisible ? 'text' : 'password'}
                        placeholder="Confirmez votre mot de passe"
                        required={true}
                    />
                    {isPwdVisible
                        ? <img src={eyeSlashedIcon} onClick={togglePwdVisible} alt='eye slashed icon' className='pwd_eye_icon' />
                        : <img src={eyeIcon} onClick={togglePwdVisible} alt='eye icon' className='pwd_eye_icon' />
                    }
                </div>
                <Button content="Créer le compte" classList="mb-3" isLoading={isLoading} />
            </form>
            <p className="text-center">
                Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
            </p>
            </motion.div>
        </div>
    </div>
}
