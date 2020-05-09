import gql from 'graphql-tag'

export const GET_FOLLOWER_STATUS = gql`
query getFollowerStatus($user_id: String!, $follower_id: String!) {
    follow_aggregate(where: {_and: {user_id: {_eq: $user_id}, follower_id: {_eq: $follower_id}}}) {
      aggregate {
        count
      }
    }
  }  
`