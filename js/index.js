const apiKey = '783ea64adfe1a28f1227c732';

const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelectorAll(".from select"),
toCurrency = document.querySelectorAll(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in country_code) {
        let selected;
        if(i == 0) {
            selected = currency_code == 'USD' ? 'selected' : '';
        } else if(i == 1) {
            selected = currency_code == 'TRY' ? 'selected' : '';
        }
       let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag)
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target)
    })
}

function loadFlag(element){
    for(code in country_code) {
        if(code == element.value) {
            let imgTag = element.parentElement.querySelector("img")
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

getButton.addEventListener("click", e => {
    e.preventDefault()
    getExchangeRate()
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input")
    let amountVal = amount.value;
    if(amountVal == '' || amountVal == "0") {
        amount.value = '1';
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency[0].value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency[0].value]
        let totalExchangeRate = (amountVal * exchangeRate)
        const exchangeRateTxt = document.querySelector(".exchange-rate")
        exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency[0].value} = ${totalExchangeRate} ${toCurrency[0].value}`
    });
}