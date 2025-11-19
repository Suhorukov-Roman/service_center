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
	// Хук для управления состоянием модального окна (открыто/закрыто)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	// Состояние для отображения данных формы после отправки
	const [action, setAction] = React.useState<string | null>(null)

	// Список доступных устройств для выбора
	const devices = [
		{ key: 'phone', label: 'Смартфон' },
		{ key: 'tv', label: 'Телевизор' },
		{ key: 'laptop', label: 'Ноутбук' },
		{ key: 'pc', label: 'Компьютер' },
		{ key: 'wash', label: 'Стиральная машина' },
		{ key: 'fridge', label: 'Холодильник' },
	]

	// Функция обработки отправки формы
	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		onClose: () => void
	) => {
		e.preventDefault() // Отменяем стандартное поведение формы
		const data = Object.fromEntries(new FormData(e.currentTarget)) // Получаем данные формы
		setAction(`submit ${JSON.stringify(data)}`) // Сохраняем данные в состоянии для отображения
		console.log('Form data:', data) // Выводим данные в консоль
		onClose() // Закрываем модальное окно после отправки
	}

	return (
		<>
			{/* Кнопка для открытия модального окна */}
			<Button
				color='primary'
				className='text-[18px] sm:text-[16px] lg:text-[18px] font-medium bg-[#3090ff]'
				onPress={onOpen}
			>
				Заказать мастера
			</Button>

			{/* Модальное окно */}
			<Modal isOpen={isOpen} placement='top-center' onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							{/* Заголовок модального окна */}
							<ModalHeader className='text-black'>Заказать мастера</ModalHeader>

							{/* Форма внутри модального окна */}
							<Form
								className='flex flex-col gap-4'
								onSubmit={e => handleSubmit(e, onClose)}
							>
								{/* Основная часть модального окна с полями формы */}
								<ModalBody className='text-black flex flex-col gap-4 w-[100%]'>
									{/* Поле ФИО */}
									<Input
										isRequired
										errorMessage='Введите ФИО'
										label='Фамилия Имя'
										placeholder='Введите ФИО'
										name='fio'
										variant='bordered'
										classNames={{ label: 'text-black' }}
									/>

									{/* Поле телефон */}
									<Input
										isRequired
										errorMessage='Введите номер телефона'
										label='Телефон'
										placeholder='Введите номер телефона'
										name='phone'
										variant='bordered'
										classNames={{ label: 'text-black' }}
										type='tel'
									/>

									{/* Выпадающий список с выбором техники */}
									<Select
										isRequired
										errorMessage='Выберите технику'
										label='Техника'
										placeholder='Выберите технику'
										name='device'
										variant='bordered'
										classNames={{ label: 'text-black', trigger: 'text-black' }}
									>
										{devices.map(device => (
											<SelectItem key={device.key} className='text-black'>
												{device.label}
											</SelectItem>
										))}
									</Select>

									{/* Поле адреса */}
									<Input
										isRequired
										errorMessage='Введите адрес'
										label='Адрес'
										placeholder='Введите адрес'
										name='address'
										variant='bordered'
										classNames={{ label: 'text-black' }}
									/>

									{/* Поле "Подробнее" (необязательное) */}
									<Textarea
										label='Подробнее'
										placeholder='Опишите проблему'
										name='details'
										variant='bordered'
										minRows={3}
										classNames={{ label: 'text-black' }}
									/>

									{/* Чекбокс для согласия с политикой конфиденциальности */}
									<Checkbox
										isRequired
										name='agree'
										classNames={{ label: 'text-black text-[12px]' }}
									>
										Вы соглашаетесь с политикой конфиденциальности
									</Checkbox>
								</ModalBody>

								{/* Нижняя часть модального окна с кнопками */}
								<ModalFooter>
									{/* Кнопка закрытия модалки */}
									<Button color='danger' variant='flat' onPress={onClose}>
										Закрыть
									</Button>

									{/* Кнопка отправки формы */}
									<Button color='primary' type='submit'>
										Заказать
									</Button>
								</ModalFooter>
							</Form>

							{/* Отображение данных отправленной формы */}
							{action && (
								<div className='text-small text-default-500 p-4'>
									Action: <code>{action}</code>
								</div>
							)}
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
