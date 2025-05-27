import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query (
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          fullName
          description
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          language
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      url
      description
      ownerAvatarUrl
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      language
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const ME = gql`
  query ($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            createdAt
            rating
            user {
              username
            }
            text
            repository {
              fullName
              id
            }
          }
        }
      }
    }
  }
`;
