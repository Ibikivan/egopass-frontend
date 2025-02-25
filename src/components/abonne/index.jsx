import { useQuery } from "react-query"
import { usePageTitle } from "../../hooks"
import Spinner from "../UI/Spinner"

export default function Abonne({ queryKey, getter, title }) {

    usePageTitle(title)
    // const { isLoading, data, error } = useQuery(queryKey, async () => await getter())
    // const pass = data?.items || []

    // if (isLoading) return <Spinner otherClass='m-auto' />

    return <div className="agent_home container">
        <h2 className="text-center mb-4">Mes Voyages</h2>
    </div>
}
