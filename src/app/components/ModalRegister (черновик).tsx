'use client'
import React, { useState } from 'react'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Checkbox,
	Button,
	useDisclosure,
	Input,
	Form,
} from '@heroui/react'

export default function RegisterModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [touched, setTouched] = useState(false)
	const [errors, setErrors] = useState({
		phone: '',
		password: '',
		confirm: '',
	})

	// Проверка телефона: +7XXXXXXXXXX (до 12 символов)
	const validatePhone = (value: string) => {
		if (!value.startsWith('+7')) return 'Телефон должен начинаться с +7'
		if (value.length !== 12) return 'Телефон должен содержать 12 символов'
		if (!/^\+7\d{10}$/.test(value))
			return 'Номер должен содержать только цифры после +7'
		return ''
	}

	// Проверка пароля
	const validatePassword = (value: string) => {
		const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/
		if (!regex.test(value))
			return 'Пароль должен содержать минимум 8 символов, 1 букву, 1 цифру и 1 спец-символ'
		return ''
	}

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		onClose: () => void
	) => {
		e.preventDefault()
        setTouched(true)

		const formData = new FormData(e.currentTarget)
		const phone = formData.get('phone') as string
		const password = formData.get('password') as string
		const confirm = formData.get('confirm') as string

		// Валидируем
		const phoneErr = validatePhone(phone)
		const passErr = validatePassword(password)
		const confirmErr = password !== confirm ? 'Пароли не совпадают' : ''

		setErrors({
			phone: phoneErr,
			password: passErr,
			confirm: confirmErr,
		})

		// Если есть ошибки - предупреждаем
		if (!(phoneErr || passErr || confirmErr)) {
			onClose()
		}
	}

	return (
		<>
			<Button
				color='primary'
				className='text-[18px] bg-[#3090ff]'
				onPress={onOpen}
			>
				Регистрация
			</Button>

			<Modal isOpen={isOpen} placement='top-center' onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='text-black'>Регистрация</ModalHeader>

							<Form
								className='flex flex-col gap-4'
								onSubmit={e => handleSubmit(e, onClose)}
							>
								<ModalBody className='text-black flex flex-col gap-4  w-[100%]'>
									{/* Телефон */}
									<Input
										isRequired
										label='Телефон'
										name='phone'
										variant='bordered'
										placeholder='+7XXXXXXXXXX'
										maxLength={12}
										minLength={12}
										errorMessage={touched ? errors.phone : ''}
										isInvalid={touched && !!errors.phone}
										onChange={e => {
											if (touched) {
												setErrors(prev => ({
													...prev,
													phone: validatePhone(e.target.value),
												}))
											}
										}}
									/>

									{/* Пароль */}
									<Input
										isRequired
										label='Пароль'
										name='password'
										variant='bordered'
										type='password'
										placeholder='Введите пароль'
										minLength={8}
										errorMessage={touched ? errors.password : ''}
										isInvalid={touched ? !!errors.password : false}
										onChange={e => {
											if (touched) {
												setErrors(prev => ({
													...prev,
													password: validatePassword(e.target.value),
												}))
											}
										}}
									/>

									{/* Подтверждение */}
									<Input
										isRequired
										label='Подтверждение пароля'
										name='confirm'
										variant='bordered'
										type='password'
										placeholder='Повторите пароль'
										minLength={8}
										errorMessage={touched ? errors.confirm : ''}
										isInvalid={touched ? !!errors.confirm : false}
										onChange={e => {
											if (touched) {
												setErrors(prev => ({
													...prev,
													confirm:
														e.target.value ===
														(
															document.querySelector(
																"input[name='password']"
															) as HTMLInputElement
														)?.value
															? ''
															: 'Пароли не совпадают',
												}))
											}
										}}
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

								<ModalFooter>
									<Button color='danger' variant='flat' onPress={onClose}>
										Закрыть
									</Button>

									<Button color='primary' type='submit'>
										Зарегистрироваться
									</Button>
								</ModalFooter>
							</Form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
