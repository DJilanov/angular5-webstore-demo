import { LocalstorageCartModel } from './localstorage-cart.model';

export class OrderModel {
  name: string;
  email: string;
  phone: string;
  message: string;
  address: string;
  products: LocalstorageCartModel[]

  constructor(
    name?: string,
    email?: string,
    phone?: string,
    message?: string,
    address?: string,
    products?: LocalstorageCartModel[]
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.address = address;
    this.products = products;
  }
}
