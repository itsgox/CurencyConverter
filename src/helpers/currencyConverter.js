import CC from 'currency-converter-lt';
let currencyConverter = new CC();
currencyConverter = currencyConverter.setupRatesCache({
	isRatesCaching: true,
	ratesCacheDuration: 1800
});
export default currencyConverter;