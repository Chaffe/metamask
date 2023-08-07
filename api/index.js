export const getCryptoExchangeRate = async ({ cryptoCurrency, exchangeOperation }) => {
    return fetch(`https://api.coinbase.com/v2/prices/${cryptoCurrency}-USD/${exchangeOperation}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
}
