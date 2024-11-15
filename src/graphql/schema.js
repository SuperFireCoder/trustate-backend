import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Customer {
    ID: ID
    FirstName: String
    SecondName: String
    LastName: String
    Email: String
    FullName: String
    Date: String
    Location: String
    Description: String
  }

  type Query {
    Customers: [Customer]
    Customer(ID: ID!): Customer
  }

  type Mutation {
    CreateCustomer(
      FullName: String
      FirstName: String
      SecondName: String
      LastName: String
      Email: String
      Date: String
      Location: String
      Description: String
    ): Customer

    UpdateCustomer(
      ID: ID!
      FirstName: String
      SecondName: String
      LastName: String
      Email: String
      Date: String
      Location: String
      Description: String
    ): Customer
    
    DeleteCustomer(ID: ID!): Customer
  }
`;

export default typeDefs;