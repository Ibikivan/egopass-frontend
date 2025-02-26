import { Scanner } from '@yudiel/react-qr-scanner'
import Spinner from '../UI/Spinner'

export default function ScanInterface({onScan, onError, isLoading}) {

    return <div style={{position: 'relative'}}>
        <Scanner
            onScan={onScan}
            onError={onError}
        />

        {isLoading && <Spinner otherClass="scan_spinner" />}
    </div>
};