import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Customer {
    ID: ID!
    FirstName: String!
    SecondName: String!
    LastName: String!
    Email: String!
  }

  type Query {
    Customers: [Customer]
  }

  type Mutation {
    CreateCustomer(
      FirstName: String!
      SecondName: String!
      LastName: String!
      Email: String!
    ): Customer
  }
`;

export default typeDefs;