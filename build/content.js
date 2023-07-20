function convertPriceToTime() {

    let chromeWage = 1;

    chrome.storage.local.get(['hourlyWage']).then((result) => {
       
        chromeWage = parseFloat(result.hourlyWage)

        const pricesArray = [];
        const hoursArray = [];
        const priceWholeHTML = document.querySelectorAll('.a-price-whole')
        const priceFractionHTML = document.querySelectorAll('.a-price-fraction'); 
        const miscPriceHTML = document.querySelectorAll('._p13n-desktop-sims-fbt_fbt-desktop_total-amount__wLVdU, .a-color-price')
    
        for (let i=0; i < priceWholeHTML.length; i++) {
            pricesArray.push(parseInt((priceWholeHTML[i].innerText).replace(',','')));
            if (parseInt(priceFractionHTML[i].innerText) >= 50) {
                pricesArray[i]++;
            }
        }
    
        for (let i=0; i < pricesArray.length; i++) {
        hoursArray.push((pricesArray[i] / chromeWage).toFixed(2))
        }
    
    
        for (let j=0; j < priceFractionHTML.length; j++) {
        
            const hours = Math.floor(hoursArray[j]);
            const minutes = Math.round((hoursArray[j] - hours) * 60);

            if (isNaN(hours) || isNaN(minutes)) continue;

            var timeDisplay;
            var timeDisplaySpan = document.createElement("span");

            if (hours == 1) {
                timeDisplay = document.createTextNode(` ${hours} hour and ${minutes} minutes`)
            } else {
                timeDisplay = document.createTextNode(` ${hours} hours and ${minutes} minutes`)
            }

            priceFractionHTML[j].appendChild(timeDisplaySpan).appendChild(timeDisplay);
            timeDisplaySpan.style.color = "#529952";
            timeDisplaySpan.style.backgroundColor = '#ffff12';
            timeDisplaySpan.style.fontSize = "14px";

        }

        for (let i=0; i < miscPriceHTML.length; i++) {

            if (miscPriceHTML[i].innerHTML.includes("%")) {continue}

            const time = parseFloat((miscPriceHTML[i].innerHTML).replace(',','').replace('$','')) / chromeWage;

            if (isNaN(time)) continue;

            const hours = Math.floor(time);
            const minutes = Math.round((time - hours) * 60);

            var timeDisplay;
            var timeDisplaySpan = document.createElement("span");

            if (hours == 1) {
                timeDisplay = document.createTextNode(` ${hours} hour and ${minutes} minutes`)
            } else {
                timeDisplay = document.createTextNode(` ${hours} hours and ${minutes} minutes`)
            }

            miscPriceHTML[i].appendChild(timeDisplaySpan).appendChild(timeDisplay);
            timeDisplaySpan.style.color = "#529952";
            timeDisplaySpan.style.backgroundColor = '#ffff12';
            timeDisplaySpan.style.fontSize = "14px";
        }
     
    });
  
}

convertPriceToTime();