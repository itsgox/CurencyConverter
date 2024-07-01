import { fetchApi } from '@/helpers/fetchApi';
import Client from './client';

export default async function Home() {

	const currencies = (await fetchApi('/currencies')) || [];
	const inital = (await fetchApi('/convert', { from: 'USD', to: 'EUR', amount: 100 })) || 0;

	return (
		<Client data={{ currencies, inital, domain: process.env.VERCEL_PROJECT_PRODUCTION_URL }} />
	);
}
