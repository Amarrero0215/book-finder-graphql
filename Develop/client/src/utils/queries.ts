import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      savedBooks {
        bookId
        title
      }
    }
  }
`;

export const QUERY_BOOK_BY_ID = gql`
  query GetBookById($bookId: ID!) {
    book(bookId: $bookId) {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;

export const QUERY_SAVED_BOOKS = gql`
  query GetSavedBooks {
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;

export const QUERY_USER_STATS = gql`
  query GetUserStats {
    userStats {
      totalSavedBooks
      recentActivity
    }
  }
`;

