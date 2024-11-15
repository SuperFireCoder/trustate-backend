import { Customer } from '../models/customer.js';

let customers = [
    new Customer(1, 'John', 'Middle', 'Doe', 'john@example.com', '2024-01-04', 'Berlin', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat'),
    new Customer(2, 'Jane', 'Middle', 'Smith', 'jane@example.com', '2024-10-04', 'Sydney', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat'),
    new Customer(3, 'Mark', 'Anthony', 'Brown', 'mark@example.com', '2024-12-17', 'New York', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat'),
];

export const createCustomer = ({ FirstName, SecondName, LastName, Email, Date, Location, Description }) => {
    const id = customers.length + 1;
    const newCustomer = new Customer(id, FirstName, SecondName, LastName, Email, Date, Location, Description);
    customers.push(newCustomer);
    return newCustomer;
};

export const getAllCustomers = () => {
    return customers;
};

export const getCustomerById = (id) => {
    const customer = customers.find((customer) => customer.ID === id);
    if (!customer) {
        throw new Error('Customer not found');
    }
    return customer;
};

export const updateCustomer = (id, updates) => {
    const customerIndex = customers.findIndex((customer) => customer.ID === id);
    if (customerIndex === -1) {
        throw new Error('Customer not found');
    }
    customers[customerIndex] = { ...customers[customerIndex], ...updates };
    const { FirstName, SecondName, LastName } = customers[customerIndex];
    customers[customerIndex].FullName = `${FirstName} ${SecondName} ${LastName}`;
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