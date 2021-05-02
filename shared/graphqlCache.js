import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  {
    getProductsByType(type: "instrumental") {
      id
      name
      duration
      bpm
      tags
      uploaded_by
    }
  }
`;

export const GET_SHOPPING_CART = gql`
  query {
    shoppingCart @client {
      items {
        id
        name
      }
      count
      totalCost
    }
  }
`;

