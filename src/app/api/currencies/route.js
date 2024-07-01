import { NextResponse } from 'next/server';
import currencyConverter from '@/helpers/currencyConverter';
import { getEmojiByCurrencyCode } from 'country-currency-emoji-flags';

export function GET(req) {
	let currencies = currencyConverter.currencies;
	currencies = Object.keys(currencies).map(key => {
		return {
			id: key,
			name: currencies[key],
			emoji: getEmojiByCurrencyCode(key)
		};
	});
	currencies = currencies.filter(c => c.emoji);
	return NextResponse.json(currencies);
}