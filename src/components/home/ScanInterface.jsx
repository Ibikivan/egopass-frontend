import { Scanner } from '@yudiel/react-qr-scanner'

export default function ScanInterface() {

    return <Scanner
        onScan={(result) => console.log(result)}
    />
};