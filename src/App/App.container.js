import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { GET_CURRENT_USER } from '../graphql/queries'
import { SET_CURRENT_USER } from '../graphql/mutations'
import App from './App.component'

const AppContainer = () => (
  <Query query={GET_CURRENT_USER}>
    {
      ({ data: { currentUser } }) => (
        <Mutation mutation={SET_CURRENT_USER}>
          {
            (setCurrentUser) => (
              <App 
                currentUser={currentUser}
                setCurrentUser={(user) => {
                  setCurrentUser({ variables: { user } })
                }}
              />
            )
          }
        </Mutation>
      )
    }
  </Query>
)

export default AppContainer