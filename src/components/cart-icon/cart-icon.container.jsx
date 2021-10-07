import React from 'react'
import { graphql } from 'react-apollo'
import compose  from 'lodash/flowRight'
import CartIcon from './cart-icon.component'
import { TOGGLE_CART_HIDDEN } from '../../graphql/mutations'
import { GET_ITEM_COUNT } from '../../graphql/queries'

const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => {
  return (
    <CartIcon 
      toggleCartHidden={toggleCartHidden} 
      itemCount={itemCount} 
    />         
  )
}

export default compose(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer)