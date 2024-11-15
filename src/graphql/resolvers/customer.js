import {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
} from '../../services/customerService.js';
import logger from '../../logging/logger.js';
import { customerSchema, updateCustomerSchema } from '../../validations/customerValidation.js';

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
                await customerSchema.validate(args, { abortEarly: false });
                const newCustomer = createCustomer(args);
                logger.info(`Created new customer with ID: ${newCustomer.ID}`);
                return newCustomer;
            } catch (error) {
                if (error.name === 'ValidationError') {
                    throw new Error(error.errors.join(', '));
                }
                logger.error(`Error creating customer: ${error.message}`);
                throw new Error('Failed to create customer');
            }
        },
        UpdateCustomer: async (_, { ID, ...updates }) => {
            try {
                await updateCustomerSchema.validate(updates, { abortEarly: false });
                const updatedCustomer = updateCustomer(parseInt(ID, 10), updates);
                logger.info(`Updated customer with ID: ${ID}`);
                return updatedCustomer;
            } catch (error) {
                if (error.name === 'ValidationError') {
                    throw new Error(error.errors.join(', '));
                }
                logger.error(`Error updating customer: ${error.message}`);
                throw new Error('Failed to update customer');
            }
        },
        DeleteCustomer: (_, { ID }) => {
            try {
                const deletedCustomer = deleteCustomer(parseInt(ID, 10));
                logger.info(`Deleted customer with ID: ${ID}`);
                return deletedCustomer;
            } catch (error) {
                logger.error(`Error deleting customer: ${error.message}`);
                throw new Error('Failed to delete customer');
            }
        },
    },
};

export default customerResolvers;