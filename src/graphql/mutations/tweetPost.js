import gql from 'graphql-tag'

export const TWEET_POST_MUTATION = gql`
mutation tweetPost($user_id: String!, $imageUrl: String, $caption: String) {
    insert_posts(objects: [{user_id: $user_id, imageUrl: $imageUrl, caption: $caption}]) {
      returning {
        id
        user_id
        imageUrl
        caption
      }
    }
  }  
`