import { gql } from 'apollo-boost';
import { addItemToCart, getCartItemCount } from './cart.utils';
import { 
  GET_CART_HIDDEN,
  GET_CART_ITEMS,
  GET_ITEM_COUNT
} from './queries'

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]
  }
`

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_, __, { cache }) => {
      const  {cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      })

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      })
      return !cartHidden
    },
    addItemToCart: (_, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      })

      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) }
      })

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
      })

      return newCartItems
    }
  }
}