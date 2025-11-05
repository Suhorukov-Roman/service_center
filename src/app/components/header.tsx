"use client";

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
} from '@heroui/react'
import Image from 'next/image';

export const AcmeLogo = () => {
	return (
		<Image
			src='/logo.svg'
			alt='Logo'
			width={160}
			height={160}
		/>
	);
	// return (
	// 	<svg fill='none' height='36' viewBox='0 0 32 32' width='36'>
	// 		<path
	// 			clipRule='evenodd'
	// 			d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
	// 			fill='currentColor'
	// 			fillRule='evenodd'
	// 		/>
	// 	</svg>
	// )
}

export default function Header() {

	const navItems = [
		{ href: '/services', label: 'Каталог услуг' },
		{ href: '/contacts', label: 'Контакты' },
		{ href: '/about', label: 'О компании' },
		{ href: '/status', label: 'Статус ремонта' },
	] 

	return (
		<Navbar className='h-[6rem] bg-[#0d6efd] text-white text-[18px] font-medium'>
			<NavbarBrand>
				<a href='/'>
					<AcmeLogo />
				</a>
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				{navItems.map(item => {
					return (
						<NavbarItem key={item.href}>
							<Link
								className='text-[18px] font-medium'
								color='foreground'
								href={item.href}
							>
								{item.label}
							</Link>
						</NavbarItem>
					)
				})}
			</NavbarContent>
		</Navbar>
	)
}
