import React, { useEffect, useState } from 'react'
import "../styles/Home.css"
import Banner from '../components/Banner'
import keyImg from "../assets/images/Padlock_3D_asset_FREE-removebg-preview.png"
import checkImg from "../assets/icons/alert-symbol.png"
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
    const [issues, setIssues] = useState([])

    useEffect(() => {
        // fetch("../../public/Issues.json")
        fetch("/Issues.json")
        .then((response) => response.json())
        .then((data) => {
            if (data.issues && Array.isArray(data.issues)) {
                setIssues(data.issues)
                // console.log(data.issues);
                
            } else {
                console.error("Expected an array at data.issues, but got:", data.issues);
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [])

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
  return (
    <>
    <div className="home-gen-div">
        <Banner />
        <div className="black-ban-gen-div">
            <p>With Blockchain, Our Future Assets Are Already Secured</p>
            <div>
                <img src={keyImg} alt="" />
            </div>
        </div>
        {/* main page show */}
        <div className="block-gen-div">
            <div className="block-heading-div">
                <p>SELECT THE OPTION THAT BEST SUITS YOU </p>
                <div className="each-block-div">
                    {issues.map((issue) => (
                        <Link to="wallet">
                        <div className="each-child-block-div" key={issue.id}>
                            <div className="block-iss-logo-div">
                                <img src={issue.icons} alt="" />
                            </div>
                            <div className="block-iss-writeup-div">
                                <p>{issue.name}</p>
                                <p>{issue.description}</p>
                            </div>
                        </div>
                        </Link>
                    ))}
                    
                </div>
            </div>
        </div>
        {/* footer */}
        <div className="footer-gen-div">
            <p>&copy; 2025 Blockchain Rectification Dapp</p>
            <div>
                <p onClick={handleScroll}>Terms of Services</p>
                <p onClick={handleScroll}>Privacy Policy</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home
