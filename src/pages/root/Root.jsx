import { ErrorBoundary } from "react-error-boundary";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getLogedUser } from "../../utils/api/authAPIs";
import Spinner from "../../components/UI/Spinner";
import { useOnline } from "../../hooks/useOnline";
import { useContext, useEffect } from "react";
import { ProfilContext } from "../../hooks/useProfil";
import { ToastContext } from "../../hooks/useToast";

export default function Root({ footerRef }) {

    const { setUserProfil } = useContext(ProfilContext)
    const queryKey = ['user']
    const { isLoading, data: user, error, isSuccess } = useQuery(queryKey, async () => getLogedUser())
    const isOnline = useOnline()
    const navigate = useNavigate()
    const location = useLocation()
    const isLogged = location.state?.logged
    const { openToast } = useContext(ToastContext)

    useEffect(() => {
        if (error && !isLogged) {
            openToast({ message: "Erreur ou Session expirée", type: "failed" })
            navigate('/login')
        }
    }, [error])

    useEffect(() => {
        if (user && isSuccess) setUserProfil({user, isLoading})
    }, [user, isSuccess, isLoading])

    if (isLoading) return <div className="full_page_spinner"><Spinner otherClass='m-auto' /></div>

    if (user) {
        return <div className="vstack fullHeight">
            <Header userInfo={{userName: user?.username, picture: user?.profilePicture, isOnline: isOnline}} />
            <ErrorBoundary
                fallback={<h3>Oup's, une erreur est survenue</h3>}
                onReset={() => console.log("reset appliqué")}
            >
                <Outlet />
            </ErrorBoundary>
            <Footer ref={footerRef} />
            
        </div>
    }
}
