import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../src/graphql/schema.js';
import customerResolvers from '../src/graphql/resolvers/customer.js';

const server = new ApolloServer({
    typeDefs,
    resolvers: customerResolvers,
});

const { mutate } = createTestClient(server);

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