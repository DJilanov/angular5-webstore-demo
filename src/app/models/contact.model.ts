export class ContactModel {
	name: string;
	email: string;
	phone: string;
	message: string;

	constructor(
		name?: string,
		email?: string,
		phone?: string,
		message?: string,
	) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.message = message;
	}
}
