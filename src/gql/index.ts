import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Book = {
  __typename?: 'Book';
  count: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  errorCode: Scalars['Float']['output'];
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type LoginFields = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBook?: Maybe<Book>;
  deleteBookById?: Maybe<Scalars['Boolean']['output']>;
  getBookByUser?: Maybe<Book>;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean']['output'];
  registry: UserResponse;
  updateBook?: Maybe<Book>;
  updateStudent: UserResponse;
};


export type MutationCreateBookArgs = {
  count: Scalars['Float']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteBookByIdArgs = {
  bookId: Scalars['Float']['input'];
};


export type MutationGetBookByUserArgs = {
  bookId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  options: LoginFields;
};


export type MutationRegistryArgs = {
  options: RegistryFields;
};


export type MutationUpdateBookArgs = {
  bookId: Scalars['Float']['input'];
  count: Scalars['Float']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationUpdateStudentArgs = {
  options: RegistryFields;
};

export type Query = {
  __typename?: 'Query';
  getAllBooks?: Maybe<Array<Book>>;
  getAllUsers?: Maybe<Array<User>>;
  getBookById?: Maybe<Array<Book>>;
  getMe?: Maybe<User>;
};


export type QueryGetBookByIdArgs = {
  bookId: Scalars['Float']['input'];
};

export type RegistryFields = {
  email: Scalars['String']['input'];
  isAdmin: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  books: Array<Book>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  isAdmin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type InputErrorFieldsFragment = { __typename?: 'FieldError', errorCode: number, field: string, message: string };

export type DeleteBookByIdMutationVariables = Exact<{
  bookId: Scalars['Float']['input'];
}>;


export type DeleteBookByIdMutation = { __typename?: 'Mutation', deleteBookById?: boolean | null };

export type UpdateBookMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  count: Scalars['Float']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  bookId: Scalars['Float']['input'];
}>;


export type UpdateBookMutation = { __typename?: 'Mutation', updateBook?: { __typename?: 'Book', id: number, name: string, count: number, imageUrl: string, users: Array<{ __typename?: 'User', id: number, isAdmin: boolean, name: string, phone: string }> } | null };

export type CreateBookMutationVariables = Exact<{
  count: Scalars['Float']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateBookMutation = { __typename?: 'Mutation', createBook?: { __typename?: 'Book', id: number, name: string, count: number, imageUrl: string } | null };

export type LoginMutationVariables = Exact<{
  options: LoginFields;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string, errorCode: number }> | null, user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, isAdmin: boolean, name: string, email: string, phone: string } | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegistryMutationVariables = Exact<{
  options: RegistryFields;
}>;


export type RegistryMutation = { __typename?: 'Mutation', registry: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string, errorCode: number }> | null, user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, isAdmin: boolean, name: string, email: string, phone: string } | null } };

export type UpdateStudentMutationVariables = Exact<{
  options: RegistryFields;
}>;


export type UpdateStudentMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string, errorCode: number }> | null, user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, isAdmin: boolean, name: string, email: string, phone: string, books: Array<{ __typename?: 'Book', name: string, id: number }> } | null } };

export type BookFieldsFragment = { __typename?: 'Book', id: number, name: string, imageUrl: string, users: Array<{ __typename?: 'User', id: number, name: string }> };

export type GetAllBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBooksQuery = { __typename?: 'Query', getAllBooks?: Array<{ __typename?: 'Book', id: number, name: string, imageUrl: string, users: Array<{ __typename?: 'User', id: number, name: string }> }> | null };

export type GetBookByIdQueryVariables = Exact<{
  bookId: Scalars['Float']['input'];
}>;


export type GetBookByIdQuery = { __typename?: 'Query', getBookById?: Array<{ __typename?: 'Book', id: number, name: string, imageUrl: string, users: Array<{ __typename?: 'User', id: number, name: string }> }> | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers?: Array<{ __typename?: 'User', id: number, name: string, email: string, phone: string, isAdmin: boolean }> | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe?: { __typename?: 'User', id: number, name: string, email: string, phone: string, isAdmin: boolean, books: Array<{ __typename?: 'Book', name: string, id: number, imageUrl: string, count: number }> } | null };

export type UserFieldsFragment = { __typename?: 'User', id: number, name: string, email: string, phone: string, isAdmin: boolean };

export const InputErrorFieldsFragmentDoc = gql`
    fragment InputErrorFields on FieldError {
  errorCode
  field
  message
}
    `;
export const BookFieldsFragmentDoc = gql`
    fragment BookFields on Book {
  id
  name
  imageUrl
  users {
    id
    name
  }
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  name
  email
  phone
  isAdmin
}
    `;
export const DeleteBookByIdDocument = gql`
    mutation DeleteBookById($bookId: Float!) {
  deleteBookById(bookId: $bookId)
}
    `;
export type DeleteBookByIdMutationFn = Apollo.MutationFunction<DeleteBookByIdMutation, DeleteBookByIdMutationVariables>;

/**
 * __useDeleteBookByIdMutation__
 *
 * To run a mutation, you first call `useDeleteBookByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookByIdMutation, { data, loading, error }] = useDeleteBookByIdMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useDeleteBookByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookByIdMutation, DeleteBookByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookByIdMutation, DeleteBookByIdMutationVariables>(DeleteBookByIdDocument, options);
      }
export type DeleteBookByIdMutationHookResult = ReturnType<typeof useDeleteBookByIdMutation>;
export type DeleteBookByIdMutationResult = Apollo.MutationResult<DeleteBookByIdMutation>;
export type DeleteBookByIdMutationOptions = Apollo.BaseMutationOptions<DeleteBookByIdMutation, DeleteBookByIdMutationVariables>;
export const UpdateBookDocument = gql`
    mutation UpdateBook($userId: Float!, $count: Float!, $imageUrl: String!, $name: String!, $bookId: Float!) {
  updateBook(
    userId: $userId
    count: $count
    imageUrl: $imageUrl
    name: $name
    bookId: $bookId
  ) {
    id
    name
    count
    imageUrl
    users {
      id
      isAdmin
      name
      phone
    }
  }
}
    `;
export type UpdateBookMutationFn = Apollo.MutationFunction<UpdateBookMutation, UpdateBookMutationVariables>;

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      count: // value for 'count'
 *      imageUrl: // value for 'imageUrl'
 *      name: // value for 'name'
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useUpdateBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, options);
      }
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>;
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<UpdateBookMutation, UpdateBookMutationVariables>;
export const CreateBookDocument = gql`
    mutation CreateBook($count: Float!, $imageUrl: String!, $name: String!) {
  createBook(count: $count, imageUrl: $imageUrl, name: $name) {
    id
    name
    count
    imageUrl
  }
}
    `;
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      count: // value for 'count'
 *      imageUrl: // value for 'imageUrl'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateBookMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options);
      }
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>;
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>;
export const LoginDocument = gql`
    mutation Login($options: LoginFields!) {
  login(options: $options) {
    errors {
      field
      message
      errorCode
    }
    user {
      id
      createdAt
      updatedAt
      isAdmin
      name
      email
      phone
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegistryDocument = gql`
    mutation Registry($options: RegistryFields!) {
  registry(options: $options) {
    errors {
      field
      message
      errorCode
    }
    user {
      id
      createdAt
      updatedAt
      isAdmin
      name
      email
      phone
    }
  }
}
    `;
export type RegistryMutationFn = Apollo.MutationFunction<RegistryMutation, RegistryMutationVariables>;

/**
 * __useRegistryMutation__
 *
 * To run a mutation, you first call `useRegistryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registryMutation, { data, loading, error }] = useRegistryMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegistryMutation(baseOptions?: Apollo.MutationHookOptions<RegistryMutation, RegistryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistryMutation, RegistryMutationVariables>(RegistryDocument, options);
      }
export type RegistryMutationHookResult = ReturnType<typeof useRegistryMutation>;
export type RegistryMutationResult = Apollo.MutationResult<RegistryMutation>;
export type RegistryMutationOptions = Apollo.BaseMutationOptions<RegistryMutation, RegistryMutationVariables>;
export const UpdateStudentDocument = gql`
    mutation UpdateStudent($options: RegistryFields!) {
  updateStudent(options: $options) {
    errors {
      field
      message
      errorCode
    }
    user {
      id
      createdAt
      updatedAt
      isAdmin
      name
      email
      phone
      books {
        name
        id
      }
    }
  }
}
    `;
export type UpdateStudentMutationFn = Apollo.MutationFunction<UpdateStudentMutation, UpdateStudentMutationVariables>;

/**
 * __useUpdateStudentMutation__
 *
 * To run a mutation, you first call `useUpdateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentMutation, { data, loading, error }] = useUpdateStudentMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateStudentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudentMutation, UpdateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudentMutation, UpdateStudentMutationVariables>(UpdateStudentDocument, options);
      }
export type UpdateStudentMutationHookResult = ReturnType<typeof useUpdateStudentMutation>;
export type UpdateStudentMutationResult = Apollo.MutationResult<UpdateStudentMutation>;
export type UpdateStudentMutationOptions = Apollo.BaseMutationOptions<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const GetAllBooksDocument = gql`
    query GetAllBooks {
  getAllBooks {
    ...BookFields
  }
}
    ${BookFieldsFragmentDoc}`;

/**
 * __useGetAllBooksQuery__
 *
 * To run a query within a React component, call `useGetAllBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBooksQuery, GetAllBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBooksQuery, GetAllBooksQueryVariables>(GetAllBooksDocument, options);
      }
export function useGetAllBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBooksQuery, GetAllBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBooksQuery, GetAllBooksQueryVariables>(GetAllBooksDocument, options);
        }
export function useGetAllBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllBooksQuery, GetAllBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllBooksQuery, GetAllBooksQueryVariables>(GetAllBooksDocument, options);
        }
export type GetAllBooksQueryHookResult = ReturnType<typeof useGetAllBooksQuery>;
export type GetAllBooksLazyQueryHookResult = ReturnType<typeof useGetAllBooksLazyQuery>;
export type GetAllBooksSuspenseQueryHookResult = ReturnType<typeof useGetAllBooksSuspenseQuery>;
export type GetAllBooksQueryResult = Apollo.QueryResult<GetAllBooksQuery, GetAllBooksQueryVariables>;
export const GetBookByIdDocument = gql`
    query GetBookById($bookId: Float!) {
  getBookById(bookId: $bookId) {
    ...BookFields
  }
}
    ${BookFieldsFragmentDoc}`;

/**
 * __useGetBookByIdQuery__
 *
 * To run a query within a React component, call `useGetBookByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookByIdQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useGetBookByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
      }
export function useGetBookByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
        }
export function useGetBookByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
        }
export type GetBookByIdQueryHookResult = ReturnType<typeof useGetBookByIdQuery>;
export type GetBookByIdLazyQueryHookResult = ReturnType<typeof useGetBookByIdLazyQuery>;
export type GetBookByIdSuspenseQueryHookResult = ReturnType<typeof useGetBookByIdSuspenseQuery>;
export type GetBookByIdQueryResult = Apollo.QueryResult<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    ...UserFields
    books {
      name
      id
      imageUrl
      count
    }
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;