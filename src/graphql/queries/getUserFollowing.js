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