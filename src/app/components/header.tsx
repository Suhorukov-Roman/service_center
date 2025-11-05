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
