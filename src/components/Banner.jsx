import React, { useEffect, useState } from 'react'
import "../styles/Banner.css"
import bannerImg from "../assets/images/banner.jpg"
import trumpImg from "../assets/images/trump1.png"
import muskImg from "../assets/images/musk5-removebg-preview.png"
import { Link } from 'react-router-dom'
import axios from "axios"

const images = [trumpImg, muskImg]

const Banner = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0))
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    // FETCHING PRICE
    const [coins, setCoins] = useState([])

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "usd",
                            order: "market_cap_desc",
                            per_page: 15, // Get the top 15 coins
                            page: 1,
                            sparkline: false,
                        }
                    }
                )

                setCoins(response.data)
            } catch (error) {
                console.error("Error fetching cryptocurrency data:", error);
            }
        }
        fetchPrice()
        const timeInterval = setInterval(fetchPrice, 30000)
        
        return () => clearInterval(timeInterval)
        
    }, [])

    console.log(coins);

  return (
    <>
    <div className="banner-gen-div">
        <img src={bannerImg} alt="" className="banner-img" />
        <div className="overlay-div"></div>
        <div className="banner-content">
            <div className="banner-write-up">
                <p className="banner-big-text">Blockchain Rectification</p>
                <p className='banner-small-text'>Revolutionizing rectification with blockchain 
                    technology for a better future. By harnessing 
                    the power of blockchain, we aim to create a more 
                    transparent, secure and efficient rectification 
                    process that benefits everyone.
                </p>
                <Link to="wallet" className='banner-con-wallet'>Connect Wallet</Link>
            </div>
            <div className="banner-fade-div">
                <div className="trump-div">
                    {images.map((img, index) => (
                        <img
                        key={index}
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className={`slide ${index === currentIndex ? "active" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </div>
        <div className="scroll-container">
            <div className="scroll-content">
                {coins.concat(coins).map((coin, index) => {

                    return(
                        <div className="marq-div" key={`${coin.id}-${index}`}>
                            <div className="marq-coin-img">
                                <img src={coin.image} alt="" />
                            </div>
                            <div className="marq-coin-name">
                                <p>{coin.name}</p>
                                <p>{coin.symbol.toUpperCase()}</p>
                            </div>
                            <div className="marq-coin-price" >
                                <div></div>
                                <p>${coin.current_price}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    </>
  )
}

export default Banner
