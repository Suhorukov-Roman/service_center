export interface IFormData {
	phone: string // Телефон
	password: string // Пароль
	confirmPassword: string
	createdAt?: Date // Дата создания, по умолчанию now()
}