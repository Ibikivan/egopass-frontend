import { useQuery } from "react-query"
import { usePageTitle } from "../../hooks"
import Spinner from "../UI/Spinner"
import TravelCard from "./TravelCard"
import AddTravel from "./AddTravel"

export default function AgentRVA({ queryKey, getter, title, footerRef }) {

    usePageTitle(title)
    const { isLoading, data, error } = useQuery(queryKey, async () => await getter())
    const travels = data || []

    if (isLoading) return <Spinner otherClass='m-auto' />

    return <div className="agent_home container">
        <h2 className="text-center text-secondary mb-4">Liste de vos voyages</h2>

        <div className="pass_container">
            {travels.map((travel, index) => <TravelCard
                key={`${travel.id}-${index}`}
                travel={travel}
            />)}
        </div>

        <AddTravel footerRef={footerRef} />
    </div>
}
