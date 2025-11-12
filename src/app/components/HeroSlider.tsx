'use client'

import React, { useEffect, useRef, useState } from 'react'

export type Slide = {
	id: string | number
	image?: string // optional background image URL
	title?: string
	subtitle?: string
	cta?: {
		label: string
		href?: string
	} | null
}

type HeroSliderProps = {
	slides?: Slide[]
	autoplay?: boolean
	interval?: number // ms
	className?: string
}

const defaultSlides: Slide[] = [
	{
		id: 1,
		image:
			'https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&s=0f44b6c4f7c1f3f1b9b8f4c6b2a1d2e5',
		title: 'Заголовок слайда 1',
		subtitle: 'Короткое описание или подзаголовок — покажи ценность здесь',
		cta: { label: 'Подробнее', href: '#' },
	},
	{
		id: 2,
		image:
			'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f8b7d6c3d9f3d1b0f9a4b3c2d1e0f7a',
		title: 'Заголовок слайда 2',
		subtitle: 'Другой текст для второго слайда — можно менять по желанию',
		cta: { label: 'Начать', href: '#' },
	},
	{
		id: 3,
		image:
			'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&s=7ab1c9b6a2f3e4d5c6b7a8f9e0d1c2b3',
		title: 'Заголовок слайда 3',
		subtitle: 'Третий слайд — можно использовать для промо или акций',
		cta: { label: 'Купить', href: '#' },
	},
]

export default function HeroSlider({
	slides = defaultSlides,
	autoplay = true,
	interval = 6000,
	className = '',
}: HeroSliderProps) {
	const [index, setIndex] = useState(0)
	const slidesCount = slides.length
	const timerRef = useRef<number | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!autoplay) return
		startAutoplay()
		return stopAutoplay
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index, autoplay])

	function startAutoplay() {
		stopAutoplay()
		timerRef.current = window.setInterval(() => {
			setIndex(prev => (prev + 1) % slidesCount)
		}, interval)
	}

	function stopAutoplay() {
		if (timerRef.current) {
			clearInterval(timerRef.current)
			timerRef.current = null
		}
	}

	function goTo(i: number) {
		setIndex((i + slidesCount) % slidesCount)
	}

	function prev() {
		goTo(index - 1)
	}

	function next() {
		goTo(index + 1)
	}

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') prev()
			if (e.key === 'ArrowRight') next()
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index])

	return (
		<div
			className={`relative overflow-hidden ${className} select-none`}
			onMouseEnter={stopAutoplay}
			onMouseLeave={() => autoplay && startAutoplay()}
			ref={containerRef}
		>
			{/* Slides */}
			<div
				className='flex transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]'
				style={{
					width: `${slidesCount * 100}%`,
					transform: `translateX(-${index * (100 / slidesCount)}%)`,
				}}
			>
				{slides.map(s => (
					<div
						key={s.id}
						className='w-full flex-shrink-0 relative'
						style={{ width: `${100 / slidesCount}%` }}
					>
						<div
							className='h-[60vh] md:h-[80vh] bg-center bg-cover flex items-center'
							style={{
								backgroundImage: s.image ? `url(${s.image})` : undefined,
							}}
						>
							<div className='w-full bg-gradient-to-r from-black/60 via-black/30 to-transparent p-6 md:p-12'>
								<div className='max-w-3xl text-white'>
									<h2 className='text-3xl md:text-5xl font-bold leading-tight'>
										{s.title}
									</h2>
									{s.subtitle && (
										<p className='mt-4 text-sm md:text-lg opacity-90'>
											{s.subtitle}
										</p>
									)}
									{s.cta && (
										<a
											href={s.cta.href ?? '#'}
											className='inline-block mt-6 rounded-2xl border border-white/30 px-5 py-3 text-sm md:text-base backdrop-blur-sm'
										>
											{s.cta.label}
										</a>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Left / Right arrows */}
			<button
				aria-label='Prev slide'
				onClick={prev}
				className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 backdrop-blur-sm hover:bg-black/60'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 text-white'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M15 19l-7-7 7-7'
					/>
				</svg>
			</button>

			<button
				aria-label='Next slide'
				onClick={next}
				className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 backdrop-blur-sm hover:bg-black/60'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 text-white'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 5l7 7-7 7'
					/>
				</svg>
			</button>

			{/* Dots */}
			<div className='absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-2'>
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => goTo(i)}
						className={`w-3 h-3 rounded-full transition-all ${
							i === index ? 'scale-125 bg-white' : 'bg-white/40'
						}`}
						aria-label={`Перейти к слайду ${i + 1}`}
					/>
				))}
			</div>
		</div>
	)
}
