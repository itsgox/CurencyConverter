import './globals.css';

export const metadata = {
	title: 'Currency Converter'
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className='bg-[#0b0b0b] text-white'>{children}</body>
		</html>
	);
}
