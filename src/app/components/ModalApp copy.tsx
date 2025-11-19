'use client'
import React from 'react'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Checkbox,
	Input,
	Select,
	SelectItem,
	Textarea,
	Form,
} from '@heroui/react'

export default function ModalApp() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [action, setAction] = React.useState<string | null>(null)

	const devices = [
		{ key: 'phone', label: 'Смартфон' },
		{ key: 'tv', label: 'Телевизор' },
		{ key: 'laptop', label: 'Ноутбук' },
		{ key: 'pc', label: 'Компьютер' },
		{ key: 'wash', label: 'Стиральная машина' },
		{ key: 'fridge', label: 'Холодильник' },
	]

	return (
		<>
			<Button
				color='primary'
				className='text-[18px] sm:text-[16px] lg:text-[18px] font-medium bg-[#3090ff]'
				onPress={onOpen}
			>
				Заказать мастера
			</Button>

			<Modal isOpen={isOpen} placement='top-center' onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='text-black'>Заказать мастера</ModalHeader>

							<ModalBody className='text-black'>
								{/* ФИО */}
								<Input
									label='Фамилия Имя'
									placeholder='Введите ФИО'
									variant='bordered'
									classNames={{ label: 'text-black' }}
								/>

								{/* Телефон */}
								<Input
									label='Телефон'
									placeholder='Введите номер телефона'
									variant='bordered'
									classNames={{ label: 'text-black' }}
								/>

								{/* ТЕХНИКА — ВЫПАДАЮЩИЙ СПИСОК */}
								<Select
									label='Техника'
									placeholder='Выберите технику'
									variant='bordered'
									classNames={{
										label: 'text-black',
										trigger: 'text-black',
									}}
								>
									{devices.map(device => (
										<SelectItem key={device.key} className='text-black'>
											{device.label}
										</SelectItem>
									))}
								</Select>

								{/* АДРЕС */}
								<Input
									label='Адрес'
									placeholder='Введите адрес'
									variant='bordered'
									classNames={{ label: 'text-black' }}
								/>

								{/* ПОЛЕ ПОДРОБНЕЕ */}
								<Textarea
									label='Подробнее'
									placeholder='Опишите проблему'
									variant='bordered'
									minRows={3}
									classNames={{ label: 'text-black' }}
								/>

								{/* ЧЕКБОКС */}
								<div className='flex py-2 px-1'>
									<Checkbox classNames={{ label: 'text-black text-[12px]' }}>
										Вы соглашаетесь с политикой конфиденциальности
									</Checkbox>
								</div>
							</ModalBody>

							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Закрыть
								</Button>
								<Button color='primary' onPress={onClose}>
									Заказать
								</Button>
							</ModalFooter>

							<Form
								className='w-full max-w-xs flex flex-col gap-4'
								onReset={() => setAction('reset')}
								onSubmit={e => {
									e.preventDefault()
									let data = Object.fromEntries(new FormData(e.currentTarget))

									setAction(`submit ${JSON.stringify(data)}`)
								}}
							>
								<Input
									isRequired
									errorMessage='Please enter a valid username'
									label='Username'
									labelPlacement='outside'
									name='username'
									placeholder='Enter your username'
									type='text'
								/>

								<Input
									isRequired
									errorMessage='Please enter a valid email'
									label='Email'
									labelPlacement='outside'
									name='email'
									placeholder='Enter your email'
									type='email'
								/>
								<div className='flex gap-2'>
									<Button color='primary' type='submit'>
										Submit
									</Button>
									<Button type='reset' variant='flat'>
										Reset
									</Button>
								</div>
								{action && (
									<div className='text-small text-default-500'>
										Action: <code>{action}</code>
									</div>
								)}
							</Form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
