import { forwardRef } from "react";

export default forwardRef(function Spinner({colorClassName = 'primary', otherClass = ''}, ref) {

    return <div ref={ref} className={`spinner-border text-${colorClassName} ${otherClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
})
