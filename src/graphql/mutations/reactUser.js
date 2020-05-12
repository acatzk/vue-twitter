import gql from 'graphql-tag'

export const REACT_USER_MUTATION = gql`
mutation reactUser($post_id: uuid!, $user_id: String!) {
    insert_react(objects: [{post_id: $post_id, user_id: $user_id}]) {
      returning {
        id
      }
    }
  }
`

export const UNREACT_USER_MUTATION = gql`
mutation deleteReactUser($post_id: uuid!, $user_id: String!) {
    delete_react(where: {post_id: {_eq: $post_id}, user_id: {_eq: $user_id}}) {
      returning {
        id
      }
    }
  }  
`