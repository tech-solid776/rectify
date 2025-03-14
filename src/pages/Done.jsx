import React, { useEffect, useState } from 'react'
import "../styles/Done.css"
import * as QRCode from 'qrcode'


const Done = () => {


    // GENERATE QRCODE
    const [qrCodeUrl, setQRCodeUrl] = useState('')

    useEffect(() => {
        const generateCode = async () => {
            try {
                const url = await QRCode.toDataURL('Successfully Conneccted')
                setQRCodeUrl(url)
            } catch(err) {
                console.error('Error Generating QR Code:', err);
                
            }
        }
        generateCode();
    }, [])

  return (
    <>
    <div className="done-gen-div">
        <div className="sec-part">
            <div className="try">
                <img src={qrCodeUrl} alt="QR Code" />
            </div>
            <p>Barcode Generated Successfully!!!</p>
        </div>
        
    </div>
    </>
  )
}

export default Done
