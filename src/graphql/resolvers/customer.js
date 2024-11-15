import { createCustomer, getAllCustomers } from '../../services/customerService.js';

const customerResolvers = {
    Query: {
        Customers: () => getAllCustomers(),
    },
    Mutation: {
        CreateCustomer: (_, args) => {
            return createCustomer(args);
        },
    },
};

export default customerResolvers;