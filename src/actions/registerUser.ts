'use server'

import { IFormData } from '@/types/form-data_Register'
import prisma from '@/utils/prisma'

export async function registerUser(formData: IFormData) {
	const { phone, password, confirmPassword } = formData

	// Проверка совпадения паролей
	if (password !== confirmPassword) {
		throw new Error('Пароли не совпадают')
	}

	// Можно добавить дополнительные проверки, например валидацию телефона
	if (!phone.startsWith('+7') || phone.length !== 12) {
		throw new Error('Телефон должен быть в формате +7XXXXXXXXXX')
	}

	try {
		const user = await prisma.user.create({
			data: {
				phone: phone,
				password: password,
			},
		})

		console.log('User created:', user)
		return user
	} catch (error: any) {
		console.error('Ошибка при регистрации пользователя:', error)
		throw new Error('Не удалось зарегистрировать пользователя')
	}
}
