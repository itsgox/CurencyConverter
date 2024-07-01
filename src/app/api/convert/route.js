import { NextResponse } from 'next/server';
import currencyConverter from '@/helpers/currencyConverter';

export async function POST(req) {
	const { from, to, amount } = await req.json();
	let converted = await currencyConverter.from(from).to(to).amount(amount).convert();
	converted = Number(converted.toFixed(2));
	return NextResponse.json(converted);
}