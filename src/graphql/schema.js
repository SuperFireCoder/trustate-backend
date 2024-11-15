import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Customer {
    ID: ID!
    FirstName: String!
    SecondName: String!
    LastName: String!
    Email: String!
    FullName: String!
  }

  type Query {
    Customers: [Customer]
  }

  type Mutation {
    CreateCustomer(FirstName: String!, SecondName: String!, LastName: String!, Email: String!): Customer
    UpdateCustomer(ID: ID!, FirstName: String, SecondName: String, LastName: String, Email: String): Customer
    DeleteCustomer(ID: ID!): Customer
  }
`;

export default typeDefs;