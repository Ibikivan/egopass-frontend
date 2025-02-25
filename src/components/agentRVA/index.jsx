import { useQuery } from "react-query"
import { usePageTitle } from "../../hooks"
import Spinner from "../UI/Spinner"
import EGoPassFilter from "./EGoPassFilter"
import EGoPassCard from "./EGoPassCard"
import { useEffect, useState } from "react"
import QrCodeScanner from "../home/QrCodeScanner"

export default function AgentRVA({ queryKey, getter, title, footerRef }) {

    const [_disactivated, setDisactivated] = useState(true)
    const [_day, setDayd] = useState(false)
    const [_free, setFree] = useState(true)
    const [_payed, setPayd] = useState(false)

    usePageTitle(title)
    const { isLoading, data, error, refetch, isFetching } = useQuery(queryKey, async () => await getter({_disactivated, _day, _free, _payed}))
    const egopass = data?.items || []

    useEffect(() => {
        refetch()
    }, [_disactivated, _day, _free, _payed])

    if (isLoading || isFetching) return <Spinner otherClass='m-auto' />

    return <div className="agent_home container">
        <h2 className="text-center text-secondary mb-4">Liste des e-GoPass</h2>

        <EGoPassFilter
            setDisactivate={setDisactivated}
            _disactivated={_disactivated}
            setDayd={setDayd}
            _day={_day}
            setFree={setFree}
            _free={_free}
            setPayd={setPayd}
            _payed={_payed}
        />

        <div className="pass_container">
            {egopass.map((pass, index) => <EGoPassCard
                key={`${pass.id}-${index}`}
                pass={pass}
            />)}
        </div>

        <QrCodeScanner footerRef={footerRef} />
    </div>
}
