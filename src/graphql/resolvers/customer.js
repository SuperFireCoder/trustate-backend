import { createCustomer, getAllCustomers } from '../../services/customerService.js';
import logger from '../../logging/logger.js';

const customerResolvers = {
    Query: {
        Customers: () => {
            try {
                const customers = getAllCustomers();
                logger.info(`Fetched ${customers.length} customers`);
                return customers;
            } catch (error) {
                logger.error(`Error fetching customers: ${error.message}`);
                throw new Error('Failed to fetch customers');
            }
        },
    },
    Mutation: {
        CreateCustomer: (_, args) => {
            try {
                const newCustomer = createCustomer(args);
                logger.info(`Created new customer with ID: ${newCustomer.ID}`);
                return newCustomer;
            } catch (error) {
                logger.error(`Error creating customer: ${error.message}`);
                throw new Error('Failed to create customer');
            }
        },
    },
};

export default customerResolvers;