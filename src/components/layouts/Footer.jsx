import { forwardRef } from "react";
import { Link } from "react-router-dom";
import mailIcon from '../../assets/envelope.svg'
import githubIcon from '../../assets/github.svg'
import linkedInIcon from '../../assets/linkedin.svg'

export default forwardRef(function Footer({}, ref) {

    return <footer ref={ref} className="footer soft_shadow vstack gap-2">
        <h3>Test product maded by: <span className="text-warning">@Ibikivan</span></h3>
        <div className="align-self-start d-flex gap-3">
            <Link to="mailto:ibikivan1@gmail.com" className="hstack gap-2 align-items-center justify-content-center">
                <img src={mailIcon} alt="Email icon" />
                <p>Mail me to: ibikivan1@gmail.com,</p>
            </Link>
            <Link to="https://github.com/Ibikivan" target="_blank" className="hstack gap-2 align-items-center justify-content-center">
                <img src={githubIcon} alt="Githun icon" />
                <p>Ibikivan,</p>
            </Link>
            <Link to="https://linkedin.com/in/evanel-roche-njiepue-ngaleu-355bb61a9" target="_blank" className="hstack gap-2 align-items-center justify-content-center">
                <img src={linkedInIcon} alt="LinkedIn icon" />
                <p>Evanel Roche Ngaleu</p>
            </Link>
        </div>
    </footer>
})
