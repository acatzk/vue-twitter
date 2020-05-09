import gql from 'graphql-tag'

export const FOLLOW_USER_MUTATION = gql`
mutation ($user_id: String!, $follower_id: String!) {
    insert_follow(objects: [{user_id: $user_id, follower_id: $follower_id}]) {
      returning {
        id
        user_id
        follower_id
        user {
          id
          firstname
          lastname
        }
      }
    }
  }  
`

export const DELETE_FOLLOW_USER_MUTATION = gql`
mutation ($user_id: String!, $follower_id: String!) {
    delete_follow(where: {user_id: {_eq: $user_id}, follower_id: {_eq: $follower_id}}) {
      returning {
        id
        user {
          id
          firstname
          lastname
        }
      }
    }
  }  
`
