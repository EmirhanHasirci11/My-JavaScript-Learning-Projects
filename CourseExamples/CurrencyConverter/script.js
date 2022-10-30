const api_key = "Your API key here"
const url = "https://v6.exchangerate-api.com/v6/" + api_key
const currencyOne = document.getElementById('currencyOne')
const currencyTwo = document.getElementById('currencyTwo')
const listOne = document.getElementById('listOne')
const listTwo = document.getElementById('listTwo')
const amount = document.getElementById('amount')
const calculate = document.getElementById('calculate')
const result = document.getElementById('result')

fetch(url + "codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes
        let options
        for (let item of items) {
            options += `<option value=${item[0]} >${item[1]}</option>`
        }
        listOne.innerHTML = options
        listTwo.innerHTML = options
    })
calculate.addEventListener('click', function () {
    const firstCurrency = currencyOne.value
    const secondCurrency = currencyTwo.value
    const currencyAmount = amount.value

    fetch(url + "/latest/" + firstCurrency)
        .then(res => res.json())
        .then(data => {
            const currencyResult = (data.conversion_rates[secondCurrency] * currencyAmount).toFixed(3)
            result.innerHTML = `
        <div class="card border-dark">
            <div class="card-body text-center" style="font-size:30px ;">
            ${currencyAmount} ${firstCurrency} = ${currencyResult} ${secondCurrency}
            </div>
        </div>
        `
        })
})
