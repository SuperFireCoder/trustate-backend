import { createCustomer, getAllCustomers } from '../../services/customerService.js';
import logger from '../../logging/logger.js';
import { customerSchema } from '../../validations/customerValidation.js';

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
        CreateCustomer: async (_, args) => {
            try {
                // Validate input using Yup
                await customerSchema.validate(args, { abortEarly: false });

                const newCustomer = createCustomer(args);
                logger.info(`Created new customer with ID: ${newCustomer.ID}`);
                return newCustomer;
            } catch (error) {
                if (error.name === 'ValidationError') {
                    // Handle validation errors
                    throw new Error(error.errors.join(', '));
                }
                logger.error(`Error creating customer: ${error.message}`);
                throw new Error('Failed to create customer');
            }
        },
    },
};

export default customerResolvers;