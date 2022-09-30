import { gql } from "@apollo/client";

export const GET_NUMBER_BY_USER_CODE = gql`
  query ($code: Int, $orgId: Int!) {
    users(where: { code: { _eq: $code }, org_id: { _eq: $orgId } }) {
      id
      name
      code
    }
    delek(
      limit: 1
      where: {
        inUse: { _eq: false }
        leftAmount: { _gt: 0 }
        org_id: { _eq: $orgId }
      }
    ) {
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

export const GET_ORGANIZATION = gql`
  query ($id: Int) {
    organizations(where: { id: { _eq: $id } }) {
      id
      name
      contact_email
    }
  }
`;

export const LOGIN = gql`
  query ($password: String!) {
    organizations(where: { password: { _eq: $password } }) {
      id
      name
      contact_email
    }
  }
`;

export const GET_ORG_FULL_DATA = gql`
  query ($id: Int!) {
    organizations(where: { id: { _eq: $id } }) {
      name
      contact_email
      id
      cards {
        id
        leftAmount
        number
        inUse
      }
      users {
        name
        id
        code
      }
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation ($userId: Int, $orgId: Int, $delekId: Int, $leftAmount: Int) {
    insert_transaction_one(
      object: {
        org_id: $orgId
        user_id: $userId
        leftAmount: $leftAmount
        delek_id: $delekId
      }
    ) {
      id
    }
  }
`;
