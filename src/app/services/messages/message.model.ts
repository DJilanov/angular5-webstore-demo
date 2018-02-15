export class MessageModel {
	id: string;
	name: string;
	email: string;
	phone: string;
	message: string;
	date: Date;
	

	constructor(
		id?: string,
		name?: string,
		email?: string,
		phone?: string,
		message?: string,
		date?: Date
	) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.message = message;
		this.date = date;
	}
}
