import gql from 'graphql-tag'


export const GET_USER_FOLLOWING = gql`
query getUserFollowing($id: String!) {
    following: follow_aggregate (where: { follower_id: { _eq: $id }}) {
     aggregate {
       count
     }
   }
 }
`

export const GET_ALL_FOLLOWING_USER = gql`
query getAllFollowingUser($follower_id: String!){
  showFollowing: follow (where: { follower_id: { _eq: $follower_id } }){
    id
    user_id
    follower_id
    user {
      id
      firstname
      lastname
      username
      profile {
        id
        avatarUrl
      }
    }
  }
}
`