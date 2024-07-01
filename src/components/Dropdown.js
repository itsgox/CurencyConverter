'use client';

import { useEffect, useState } from 'react';
import ClickOutside from './ClickOutside';
import { FaCircleCheck } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FiSearch, FiX } from 'react-icons/fi';

export default function Dropdown({ display, options }) {

	const [menu, setMenu] = useState(false);
	const [query, setQuery] = useState(false);

	async function updateQuery(e) {
		e.preventDefault();
		setQuery(e?.target?.value || null);
	}

	useEffect(() => {
		if (!menu) {
			const timer = setTimeout(() => setQuery(''), 600);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [menu]);

	return (
		<ClickOutside onClick={() => setMenu(false)}>
			<div className="relative group">
				<div onClick={() => setMenu(!menu)} className='bg-white/[3%] w-auto sm:w-48 py-2 px-3 rounded-md flex items-center justify-between cursor-pointer duration-200 hover:bg-white/[5%] gap-3'>
					{display}
					<MdOutlineKeyboardArrowDown className={`duration-200 ${menu ? 'rotate-180' : 'rotate-0'}`} />
				</div>
				<div className={`bg-[#000000] flex flex-col gap-2 p-2 rounded-lg w-full max-h-48 overflow-y-auto absolute whitespace-nowrap left-1/2 -translate-x-1/2 origin-top top-[calc(100%+10px)] duration-200 ${menu ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
					<div className='bg-white/[4%] pl-3 rounded-md outline-none border-none flex items-center gap-2 relative'>
						{query && <FiX onClick={() => setQuery('')} className='shrink-0 opacity-50 absolute right-3 text-lg cursor-pointer' />}
						<FiSearch className='shrink-0 opacity-50' />
						<input onChange={updateQuery} value={query || ''} placeholder='Search' className='w-full box-border py-2 bg-transparent outline-none border-none' />
					</div>
					{options.filter(opt => query ? opt.id.toLowerCase().includes(query.toLowerCase()) : true).map((opt, i) => {
						return (
							<div key={i} onClick={() => { opt.onClick(); setMenu(false); }} className={`w-full py-2 px-3 rounded-md flex items-center justify-between cursor-pointer duration-200 ${opt.selected ? 'bg-white/[12%]' : 'hover:bg-white/[7%]'}`}>
								{opt.text}
								{opt.selected && <FaCircleCheck className='text-sm opacity-80' />}
							</div>
						);
					})}
					{options.filter(opt => query ? opt.id.toLowerCase().includes(query.toLowerCase()) : true).length === 0 && <div className='py-1 w-full flex justify-center opacity-50 text-sm'>No results...</div>}
				</div>
			</div>
		</ClickOutside>
	);
}