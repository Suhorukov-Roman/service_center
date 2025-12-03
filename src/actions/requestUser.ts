'use server'
import { IFormData } from '@/types/form-data_Request'
import prisma from '@/utils/prisma'

export async function createRequest(formData: IFormData) {
	try {
		// Создаём заявку в базе
		const request = await prisma.request.create({
			data: {
				first_last_Name: formData.first_last_Name,
				phone: formData.phone,
				device: formData.device,
				address: formData.address,
				description: formData.description,
				// Статус по умолчанию PENDING
				status: formData.status || 'PENDING',
			},
		})

		console.log('Request created:', request)
		return request
	} catch (error) {
		console.error('Error creating request:', error)
	}
}
