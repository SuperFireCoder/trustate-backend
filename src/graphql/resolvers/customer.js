import { Customer } from '../../models/customer.js';

let customers = [];

const customerResolvers = {
    Query: {
        Customers: () => customers,
    },
    Mutation: {
        CreateCustomer: (_, args) => {
            const id = customers.length + 1;
            const newCustomer = new Customer(id, args.FirstName, args.SecondName, args.LastName, args.Email);
            customers.push(newCustomer);
            return newCustomer;
        },
    },
};

export default customerResolvers;