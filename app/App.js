import { Input } from '@mui/material';
import React, { useState } from 'react';

export default function App() {
  return (
    <>
      <h1>Money Is Time!</h1>
      <h2>Enter Hourly Wage:</h2>
      <InputBox />
      <ErrorBox />
      <br></br>
      <HowToUse />
      
    </>
  );
}

var currState;
chrome.storage.local.get(['hourlyWage']).then((result) => {
  currState = result.hourlyWage;
  if (isNaN(currState)) {
    currState = "15"
    const val = 15;
    chrome.storage.local.set({ 'hourlyWage': val }).then(() => {
      console.log("Value is set");
    });
  }
});

function InputBox() {
  const [val, setVal] = useState(currState)
  const click = () => {

    document.getElementById("err-msg").style.visibility = "visible";
    if (isNaN(val)) {
      document.getElementById("err-msg").style.color = "red"
      document.getElementById("err-msg").innerText = "Please correct your wage format."
    } else {
      document.getElementById("err-msg").style.color = "#ffff12"
      document.getElementById("err-msg").innerText = "Wage amount set!"
      chrome.storage.local.set({ 'hourlyWage': val }).then(() => {
        console.log("Value is set");
      });
    }
  
    /*
    chrome.storage.local.get(['hourlyWage']).then((result) => {
      alert("Value currently is " + result.hourlyWage);
    });
    */
  }
  
  const change = event => {
    setVal(event.target.value)
  }
  return (
    <div>
      <input onChange = {change} value = {val} id="hourly-wage-input"/>
      <br></br>
      <button onClick = {click} id="hourly-wage-submit-btn">Let's Go!</button>
    </div>
  )
}

function HowToUse() {
  return (
    <div id="how-to-use-box">
      <div id="how-to-use-title">
      How to Use
      </div>
      
      <div>
      1. MoneyIsTime! is currently only compatible with Amazon shopping pages.
      </div>
      <div>
      2. Enter your hourly wage in decimal format. No dollar sign ($) needed. Examples: 15, 17.50.
      </div>
      <div>
        3. Browse Amazon and see prices converted into hours you need to work!
      </div>
    </div>
  )
}

function ErrorBox() {
  return (
    <div id="err-msg">
      Please correct your wage format.
    </div>
  )
}

