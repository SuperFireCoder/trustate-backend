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

export const updateCustomer = (id, updates) => {
    const customerIndex = customers.findIndex((customer) => customer.ID === id);
    if (customerIndex === -1) {
        throw new Error('Customer not found');
    }
    customers[customerIndex] = { ...customers[customerIndex], ...updates };
    return customers[customerIndex];
};

export const deleteCustomer = (id) => {
    const customerIndex = customers.findIndex((customer) => customer.ID === id);
    if (customerIndex === -1) {
        throw new Error('Customer not found');
    }
    const [deletedCustomer] = customers.splice(customerIndex, 1);
    return deletedCustomer;
};