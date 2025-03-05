import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
      createdAt
      user {
        id
        username
      }
      text
      rating
    }
  }
`;
