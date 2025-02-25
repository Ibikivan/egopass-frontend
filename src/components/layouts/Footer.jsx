import { forwardRef } from "react";

export default forwardRef(function Footer({}, ref) {

    return <footer ref={ref} className="footer">
        <h3>Pied de page</h3>
    </footer>
})
