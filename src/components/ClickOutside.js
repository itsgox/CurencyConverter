'use client';

import { useRef, useEffect } from 'react';

export default function ClickOutside({ children, onClick }) {

	const wrapperRef = useRef();

	useEffect(() => {
		document.addEventListener('mousedown', handleClickListener);
		return () => {
			document.removeEventListener('mousedown', handleClickListener);
		};
	}, []); // eslint-disable-line

	const handleClickListener = (event) => {
		let clickedInside = (wrapperRef && wrapperRef.current.contains(event.target));
		if (!clickedInside) onClick();
		return;
	};
  
	return (
		<div ref={wrapperRef}>
			{children}
		</div>
	);
};