import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../src/graphql/schema.js';
import customerResolvers from '../src/graphql/resolvers/customer.js';

const server = new ApolloServer({
  typeDefs,
  resolvers: customerResolvers,
});

const { mutate } = createTestClient(server);

describe('Customer API', () => {
  test('Creates a new customer', async () => {
    const CREATE_CUSTOMER = `
      mutation {
        CreateCustomer(FirstName: "John", SecondName: "Middle", LastName: "Doe", Email: "john@example.com") {
          ID
          FullName
        }
      }
    `;

    const res = await mutate({ mutation: CREATE_CUSTOMER });
    expect(res.data.CreateCustomer.ID).toBeDefined();
    expect(res.data.CreateCustomer.FullName).toBe('John Middle Doe');
  });

  test('Updates an existing customer', async () => {
    const CREATE_CUSTOMER = `
      mutation {
        CreateCustomer(FirstName: "Jane", SecondName: "Middle", LastName: "Doe", Email: "jane@example.com") {
          ID
        }
      }
    `;

    const createResponse = await mutate({ mutation: CREATE_CUSTOMER });
    const customerId = createResponse.data.CreateCustomer.ID;

    const UPDATE_CUSTOMER = `
      mutation {
        UpdateCustomer(ID: "${customerId}", FirstName: "Janet", LastName: "Smith") {
          ID
          FirstName
          LastName
          FullName
        }
      }
    `;

    const updateResponse = await mutate({ mutation: UPDATE_CUSTOMER });
    expect(updateResponse.data.UpdateCustomer.ID).toBe(customerId);
    expect(updateResponse.data.UpdateCustomer.FirstName).toBe('Janet');
    expect(updateResponse.data.UpdateCustomer.LastName).toBe('Smith');
    expect(updateResponse.data.UpdateCustomer.FullName).toBe('Janet Middle Smith');
  });

  test('Deletes an existing customer', async () => {
    const CREATE_CUSTOMER = `
      mutation {
        CreateCustomer(FirstName: "Mark", SecondName: "Middle", LastName: "Johnson", Email: "mark@example.com") {
          ID
        }
      }
    `;

    const createResponse = await mutate({ mutation: CREATE_CUSTOMER });
    const customerId = createResponse.data.CreateCustomer.ID;

    const DELETE_CUSTOMER = `
      mutation {
        DeleteCustomer(ID: "${customerId}") {
          ID
          FullName
        }
      }
    `;

    const deleteResponse = await mutate({ mutation: DELETE_CUSTOMER });
    expect(deleteResponse.data.DeleteCustomer.ID).toBe(customerId);
    expect(deleteResponse.data.DeleteCustomer.FullName).toBe('Mark Middle Johnson');
  });
});
