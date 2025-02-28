
export default function TravelFilter({ filter, setFilter }) {

    const handleSetFilter = (e) => {
        const { name, checked } = e.target
        setFilter({ ...filter, [name]: checked })
    }
  
    return <div className="filter_container">
        <h3 className="text-secondary">Appliquer les filtres</h3>
        <div className="form-check hstack flex-wrap gap-5">
            <div>
                <input onChange={handleSetFilter} className="form-check-input pointer" type="checkbox" checked={filter._activated} name="_activated" id="_activated" />
                <label className="form-check-label pointer" htmlFor="_activated">
                    Pass actifs
                </label>
            </div>
            <div>
                <input onChange={handleSetFilter} className="form-check-input pointer" type="checkbox" checked={filter._disactivated} name="_disactivated" id="_disactivated" />
                <label className="form-check-label pointer" htmlFor="_disactivated">
                    Pass déscativés
                </label>
            </div>
        </div>
    </div>
}
