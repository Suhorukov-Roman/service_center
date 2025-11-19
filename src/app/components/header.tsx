"use client";

import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/react';
import Image from 'next/image';
import ModalApp from './ModalApp';

export const AcmeLogo = () => {
	return (
		<Image
			src='/logo.svg'
			alt='Logo'
			width={0}
			height={0}
			className='w-[200px] sm:w-[160px] max-w-none'
		/>
	)
}

export default function Header() {

	const navItems = [
		{ href: '/services', label: 'Каталог услуг' },
		{ href: '/contacts', label: 'Контакты' },
		{ href: '/about', label: 'О компании' },
		{ href: '/status', label: 'Посмотреть статус' },
	] 

	return (
		<Navbar className='h-[6rem] bg-[#0d6efd]'>
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
								className='text-[18px] sm:text-[16px] lg:text-[18px] font-medium'
								color='foreground'
								href={item.href}
							>
								{item.label}
							</Link>
						</NavbarItem>
					)
				})}
				<ModalApp />
			</NavbarContent>
		</Navbar>
	)
}
