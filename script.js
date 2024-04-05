const selectFromElement = document.getElementById("from-currency");
const selectToElement = document.getElementById("to-currency");

const fetchCurrencyOptions = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies,flag');
        const data = await response.json();
        const currencies = data;

        currencies.forEach(item => {
            const currency = Object.keys(item.currencies)[0];
            const officialName = item.name.official;
            const flag = item.flag;

            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = `${flag} ${currency} - ${officialName}`;
            selectFromElement.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = `${flag} ${currency} - ${officialName}`;
            selectToElement.appendChild(optionTo);
        });
    } catch (error) {
        console.log("Error fetching currency options:", error);
    }
}

fetchCurrencyOptions();

const resultElement = document.getElementById("resultant");
const conversionRateElement = document.getElementById("conversion-rate");
const convertButton = document.getElementById("convert");

convertButton.addEventListener('click', async () => {
    resultElement.textContent = 'Converting...';
    conversionRateElement.textContent = '';
    const amount = document.getElementById("amount").value;
    const fromCurrency = selectFromElement.value;
    const toCurrency = selectToElement.value;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/bc96d5150e77d3a42fcfcfd8/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = amount * rate;
        resultElement.textContent = convertedAmount.toFixed(2);
        conversionRateElement.textContent = `1 ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.log("Error converting currencies:", error);
    }
});