import { useQuery } from "react-query"
import { usePageTitle } from "../../hooks"
import Spinner from "../UI/Spinner"
import TravelCard from "./TravelCard"
import AddTravel from "./AddTravel"
import TravelFilter from "./TravelFilter"
import { useContext, useEffect, useState } from "react"
import { ToastContext } from "../../hooks/useToast"

export default function Abonne({ queryKey, getter, title, profilLoading, footerRef }) {
    usePageTitle(title)
    const { openToast } = useContext(ToastContext)
    const [filter, setFilter] = useState({_disactivated: true, _activated: true})
    const { isLoading, data, error, isFetching, refetch } = useQuery(queryKey, async () => await getter(filter))
    const travels = data || []

    useEffect(() => {
        refetch()
    }, [filter])
    
    if (error) openToast({ message: "Erreur inattendue", type: "failed" })
    if (isLoading || profilLoading) return <Spinner otherClass='m-auto' />

    return <div className="agent_home container">
        <h2 className="text-center text-secondary mb-4">Liste de vos voyages</h2>

        <TravelFilter filter={filter} setFilter={setFilter} />

        <div className="pass_container">
            {isFetching ? <Spinner otherClass='m-auto' /> :
            travels.map((travel, index) => <TravelCard
                key={`${travel.id}-${index}`}
                travel={travel}
            />)}
        </div>

        <AddTravel footerRef={footerRef} />
    </div>
}
