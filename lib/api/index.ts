import { gql } from "@apollo/client";

export const GET_NUMBER_BY_USER_CODE = gql`
  query ($code: Int) {
    users(where: { code: { _eq: $code } }) {
      id
      name
      code
    }
    delek(limit: 1, where: { inUse: { _eq: false }, leftAmount: { _gt: 0 } }) {
      id
      number
      inUse
      leftAmount
    }
  }
`;

export const UPDATE_IN_USE_BY_ID = gql`
  mutation ($id: Int!) {
    update_delek_by_pk(pk_columns: { id: $id }, _set: { inUse: true }) {
      id
      number
      inUse
    }
  }
`;

export const UPDATE_AMOUNT_LEFT = gql`
  mutation ($id: Int!, $left: Int!) {
    update_delek_by_pk(
      pk_columns: { id: $id }
      _set: { leftAmount: $left, inUse: false }
    ) {
      id
      number
      inUse
      leftAmount
    }
  }
`;
