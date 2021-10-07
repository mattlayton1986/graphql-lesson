import React from 'react'
import { Query } from 'react-apollo'
import Header from './header.component'
import { GET_HEADER_DATA } from '../../graphql/queries'

const HeaderContainer = () => (
  <Query query={GET_HEADER_DATA}>
    {
      ({ data: { cartHidden, currentUser } }) => (
        <Header hidden={cartHidden} currentUser={currentUser} />
      )
    }
  </Query>
)

export default HeaderContainer