import React, { useState } from 'react'
import "../homePage/Homepage.scss"
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'

const Homepage = () => {

  const [typeStatus, setTypeStatus] = useState("human1")

  return (
    <div className='homepage'>
      <img src="/orbital.png" alt="" className='orbital'/>
      <div className="left">
        <h1>ChatNEXUS</h1>
        <h2>Supercharge your creaivity and productivity</h2>
        <h4>
        Elevate your work with ChatNEXUS, your AI-powered creative companion. Get instant answers, spark ideas, 
        and boost productivity across any project. Experience the future of intelligent assistance today 
        </h4>
        <Link to ="/dashboard"><span>Get Started</span></Link>
      </div>
      <div className="right">
        <div className='imgContainer'>
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt=""  className='bot'/>
          <div className="chat">
            <img src={
                typeStatus === "human1" 
              ? "/human1.jpeg" 
              : typeStatus === "human1" 
              ? "/human1.jpeg"
              : typeStatus === "human1" 
              ? "/human1.jpeg"
              : "/bot.png"} 
              alt="" 
              />
          <TypeAnimation
            sequence={[
              'Human: Need creative project ideas',
              1500, () => { setTypeStatus("bot") },
              'ChatNEXUS: How about a space-themed app?',
              1500, () => { setTypeStatus("human1") },
              'Human: Sounds interesting! More details?',
              1500, () => { setTypeStatus("bot") },
              'ChatNEXUS: Picture a cosmic productivity tool',
              1500, () => { setTypeStatus("human1") },
              "Human: I like it! Let's brainstorm features",
              1500, () => { setTypeStatus("bot") },
              'ChatNEXUS: Great! Start with user profiles...',
              1500, () => { setTypeStatus("human1") },
            ]}
              wrapper="span"
              speed={50}
              cursor={true}
              style={{ fontSize: '1em', display: 'inline-block' }}
              repeat={Infinity}
              omitDeletionAnimation={true}
          />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className='links'>
        <Link to="/">Terms of Service</Link>
        <span>|</span>
        <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
