import { Customer } from '../models/customer.js';

let customers = [];

export const createCustomer = ({ FirstName, SecondName, LastName, Email }) => {
    const id = customers.length + 1;
    const newCustomer = new Customer(id, FirstName, SecondName, LastName, Email);
    customers.push(newCustomer);
    return newCustomer;
};

export const getAllCustomers = () => {
    return customers;
};