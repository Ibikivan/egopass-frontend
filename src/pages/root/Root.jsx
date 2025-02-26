import { ErrorBoundary } from "react-error-boundary";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getLogedUser } from "../../utils/api/authAPIs";
import Spinner from "../../components/UI/Spinner";
import { useOnline } from "../../hooks/useOnline";
import { useEffect } from "react";

export default function Root({ footerRef }) {

    const queryKey = ['user']
    const { isLoading, data: user, error } = useQuery(queryKey, async () => getLogedUser())
    const isOnline = useOnline()
    const navigate = useNavigate()

    if (!user || (error && error.status === 401)) {
        // Toast d'information
        navigate('/login')
    }

    if (user) {
        sessionStorage.setItem('user', JSON.stringify(user))
    }

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
