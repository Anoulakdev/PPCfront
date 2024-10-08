import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { createUploadLink } from 'apollo-upload-client'
import merge from 'deepmerge'
import { IncomingHttpHeaders } from 'http'
import fetch from 'isomorphic-unfetch'
import isEqual from 'lodash-es/isEqual'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import authConfig from 'src/configs/auth'

// import { paginationField } from './paginationField'

// const url = 'http://localhost:8081/v1/api-graphql'

const url = 'https://api-ppcd.edl.com.la/v1/api-graphql'

// const url = 'http://150.95.30.174:8081/v1/api-graphql'

// const url = process.env.URL_PATH

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  // console.log(process.env.URL_PATH)

  // const url = process.env.NEXT_PUBLIC_URL_PATH

  const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    const response = await fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        Cookie: headers?.cookie ?? '',
        authorization: storedToken ? `Bearer ${storedToken}` : ''
      }
    })

    return response
  }

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
          )
        if (networkError) console.log(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`)
      }),

      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: url,
        fetchOptions: {
          mode: 'cors'
        },
        credentials: 'include',
        fetch: enhancedFetch
      })
    ]),
    cache: new InMemoryCache({
      possibleTypes: {
        authenticatedItem: ['User']
      },
      typePolicies: {
        Query: {}
      }
    })
  })
}

type InitialState = NormalizedCacheObject | undefined

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null
  initialState?: InitialState | null
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = { headers: null, initialState: null }
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: AppProps['pageProps']) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo({ initialState: state }), [state])

  return store
}
