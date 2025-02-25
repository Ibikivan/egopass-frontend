import { motion } from 'framer-motion';
import logo from './../../assets/eGo-Pass_logo.png'
import LogoUI from '../../components/UI/Logo';
import InputText from '../../components/UI/InputText';
import Button from '../../components/UI/Button';
import { usePageTitle } from '../../hooks';
import { loginApi } from '../../utils/api/authAPIs';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const pageConfig = {
        title: "eGo-Pass Login"
    }
    const navigate = useNavigate()

    usePageTitle(pageConfig.title)
    const { isLoading: isLoging, mutate: logUser, reset } = useMutation(async (e) => await loginApi(e), {
        onSuccess: (user) => {
            console.log(user)
            reset()
            navigate('/')
        },
        onError: (err) => console.log(err)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const loginData = Object.fromEntries(formData.entries());
        logUser(loginData);
    };

    return <div
        className='vstack'
        style={{ minHeight: '100vh' }}
    >
        <div className="login_header">
            <LogoUI name={'eGoPass'} source={logo} width={200} height={100} translate={50} classList="m-auto" />
        </div>
        
        <div className='login_card_container'>
            <motion.div 
                className="card p-4 shadow-sm standard_card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-center mb-4">Connexion</h3>
                <form onSubmit={handleSubmit}>
                    <InputText
                        containerClasses='mb-3'
                        id='username'
                        name='username'
                        label="Nom d'utilisateur"
                        placeholder="Votre nom d'utilisateur"
                        required={true}
                    />
                    <InputText
                        containerClasses='mb-3'
                        id='password'
                        name='password'
                        label='Mot de passe'
                        type='password'
                        required={true}
                        placeholder="Votre mot de passe"
                    />
                    <Button content="Se connecter" classList='mb-3' isLoading={isLoging} />
                </form>

                <Link to={'/forgot-password'}>Mot de pass oublié ?</Link>
            </motion.div>
        </div>
    </div>

}
