import gql from 'graphql-tag'

export const GET_USER_PROFILE_QUERY = gql`
query getUserProfile($id: String!) {
  users(where: {id: {_eq: $id}}) {
    id
    firstname
    lastname
    email
    username
    created_at
    profile {
      id
      user_id
      bio
      avatarUrl
      website
      birthdate
      location
    }
    followers: follows_aggregate {
      aggregate {
        count
      }
    }
  }
}
`

// following: follows_aggregate(where: {follower_id: {_eq: $id}}) {
//   aggregate {
//     count
//   }
// }