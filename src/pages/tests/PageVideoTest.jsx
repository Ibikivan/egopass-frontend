import { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'

export default function ScanInterface({ onScan, onError }) {
    const [permissionGranted, setPermissionGranted] = useState(false)

    useEffect(() => {
        if (!navigator?.mediaDevices || !navigator?.mediaDevices?.getUserMedia) {
        console.error("getUserMedia() n'est pas supporté sur ce navigateur.");
        } else {
        console.log("getUserMedia() est supporté !");
        }
    }, []);

    useEffect(() => {
        navigator?.mediaDevices?.getUserMedia({ video: true })
            .then(() => setPermissionGranted(true))
            .catch(() => setPermissionGranted(false))
    }, [])

    const handleResult = (result, error) => {
        if (result) {
            onScan && onScan(result.text)
        }
        if (error) {
            console.error("Erreur QR Code:", error)
            onError && onError(error)
        }
    }

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            {!permissionGranted && <p>⚠️ Autorisez l'accès à la caméra</p>}
            <QrReader
                constraints={{
                    video: {
                        facingMode: { ideal: 'environment' }
                    }
                }}
                onResult={handleResult}
                style={{ width: '100%', height: 300, border: 'solid 2px red' }}
            />
        </div>
    )
}
