
export default function EGoPassFilter({setDisactivate, _disactivated, setDayd, _day, setFree, _free, setPayd, _payed}) {
  
    return <div className="filter_container soft_shadow">
        <h3 className="text-secondary">Appliquer les filtres</h3>
        <div className="form-check hstack flex-wrap gap-5">
            <div>
                <input onChange={(e) => setDisactivate(e.target.checked)} className="form-check-input pointer" type="checkbox" checked={_disactivated} name="_disactivated" id="disactivated" />
                <label className="form-check-label pointer" htmlFor="disactivated">
                    Désactivés
                </label>
            </div>
            <div>
                <input onChange={(e) => setDayd(e.target.checked)} className="form-check-input pointer" type="checkbox" checked={_day} name="_day" id="day" />
                <label className="form-check-label pointer" htmlFor="day">
                    Par date
                </label>
            </div>
            <div>
                <input onChange={(e) => setFree(e.target.checked)} className="form-check-input pointer" type="checkbox" checked={_free} name="_free" id="free" />
                <label className="form-check-label pointer" htmlFor="free">
                    Pass gratuits
                </label>
            </div>
            <div>
                <input onChange={(e) => setPayd(e.target.checked)} className="form-check-input pointer" type="checkbox" checked={_payed} name="_payed" id="payed" />
                <label className="form-check-label pointer" htmlFor="payed">
                    Pass payants
                </label>
            </div>
        </div>
    </div>
}
