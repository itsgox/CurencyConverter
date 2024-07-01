'use client';

import { useEffect, useState } from 'react';
import { LuArrowRightLeft } from 'react-icons/lu';
import { CgSpinner } from 'react-icons/cg';
import { PiApproximateEqualsBold } from 'react-icons/pi';
import { fetchApi } from '@/helpers/fetchApi';
import Dropdown from '@/components/Dropdown';

export default function Client({ data: { currencies, inital, domain } }) {

	const [fromCurrency, setFromCurrency] = useState('USD');
	const [toCurrency, setToCurrency] = useState('EUR');
	const [inverted, setInverted] = useState(false);

	const [amount, setAmount] = useState(100);
	const [converted, setConverted] = useState(inital);

	async function updateAmount(e) {
		e.preventDefault();
		if (!isNaN(e?.target?.value || '0')) {
			setAmount(Number(e?.target?.value || '0'));
			if (Number(e?.target?.value || '0') > 0) {
				setConverted(null);
				const _converted = await fetchApi('/convert', { from: fromCurrency, to: toCurrency, amount: Number(e?.target?.value || '0') }, { domain });
				setConverted(_converted);
			}
		}
	}

	async function invertCurrencies() {
		setInverted(!inverted);
		const _fromCurrency = `${fromCurrency}`;
		const _toCurrency = `${toCurrency}`;
		setFromCurrency(_toCurrency);
		setToCurrency(_fromCurrency);
		const _converted = await fetchApi('/convert', { from: _toCurrency, to: _fromCurrency, amount }, { domain });
		setConverted(_converted);
	}
    
	const [fromEmoji, setFromEmoji] = useState(currencies.find(c => c.id === fromCurrency)?.emoji);
	const [toEmoji, setToEmoji] = useState(currencies.find(c => c.id === toCurrency)?.emoji);

	useEffect(() => {
		setFromEmoji(currencies.find(c => c.id === fromCurrency)?.emoji);
		setToEmoji(currencies.find(c => c.id === toCurrency)?.emoji);
	}, [currencies, fromCurrency, toCurrency]);

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="bg-white/[4%] outline outline-2 outline-white/10 p-6 flex flex-col gap-6 rounded-xl">
				<div className='w-full flex justify-center'>
					<span className='text-3xl font-semibold'>Currency Converter</span>
				</div>
				<div className='w-full h-[2px] bg-white/5 rounded-full' />
				<div className='flex flex-col gap-2'>
					<span className='font-light opacity-50'>Enter Amount</span>
					<input defaultValue={amount} onChange={updateAmount} className='bg-white/[3%] outline-none border-none py-2 px-3 rounded-md' />
				</div>
				<div className='flex items-end gap-3'>
					<div className='flex flex-col gap-2'>
						<span className='font-light opacity-50'>From</span>
						<Dropdown
							display={
								<div className='flex items-center gap-1.5'>
									{fromEmoji && <span className='text-xl'>{fromEmoji}</span>}
									<span>{fromCurrency}</span>
								</div>
							}
							options={currencies.map(c => {
								return {
									id: c.id,
									text: <div className='flex items-center gap-1.5'>
										{c.emoji && <span className='text-xl'>{c.emoji}</span>}
										<span>{c.id}</span>
									</div>,
									selected: c.id === fromCurrency,
									onClick: async () => {
										setFromCurrency(c.id);
										const _converted = await fetchApi('/convert', { from: c.id, to: toCurrency, amount }, { domain });
										setConverted(_converted);
									}
								};
							})}
						/>
					</div>
					<div onClick={invertCurrencies} className='shrink-0 bg-white/[1%] duration-200 hover:bg-white/[6%] cursor-pointer w-[44.5px] rounded-md aspect-square flex items-center justify-center'>
						<LuArrowRightLeft className={`duration-500 ${inverted ? 'rotate-180' : 'rotate-0'}`} />
					</div>
					<div className='flex flex-col gap-2'>
						<span className='font-light opacity-50'>To</span>
						<Dropdown
							display={
								<div className='flex items-center gap-1.5'>
									{toEmoji && <span className='text-xl'>{toEmoji}</span>}
									<span>{toCurrency}</span>
								</div>
							}
							options={currencies.map(c => {
								return {
									id: c.id,
									text: <div className='flex items-center gap-1.5'>
										{c.emoji && <span className='text-xl'>{c.emoji}</span>}
										<span>{c.id}</span>
									</div>,
									selected: c.id === toCurrency,
									onClick: async () => {
										setToCurrency(c.id);
										const _converted = await fetchApi('/convert', { from: fromCurrency, to: c.id, amount }, { domain });
										setConverted(_converted);
									}
								};
							})}
						/>
					</div>
				</div>
				<div className='w-full h-[2px] bg-white/5 rounded-full' />
				<div className='bg-white/[8%] flex items-center justify-center py-2 px-3 rounded-md gap-2'>
					<span>{amount.toLocaleString()} {fromCurrency}</span>
					<PiApproximateEqualsBold className='opacity-50' />
					{!converted && <CgSpinner className='animate-spin' />}
					<span>{converted ? `${amount === 0 ? 0 : converted.toLocaleString()} ` : ''}{toCurrency}</span>
				</div>
			</div>
		</div>
	);
}