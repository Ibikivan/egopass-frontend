import { ErrorBoundary } from "react-error-boundary";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import { Outlet } from "react-router-dom";

export default function Root() {

    return <div className="vstack">
        <Header />
            <ErrorBoundary
                fallback={<h3>Oup's, une erreur est survenue</h3>}
                onReset={() => console.log("reset appliqué")}
            >
                <Outlet />
            </ErrorBoundary>
        <Footer />
    </div>
}
