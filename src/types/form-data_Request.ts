export interface IFormData {
	first_last_Name: string // Фамилия и имя
	phone: string // Телефон
	device: string // Техника (например, ноутбук, телефон)
	address: string // Адрес клиента
	description?: string // Подробнее (необязательно)
	status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' // Статус заявки, по умолчанию PENDING
}
