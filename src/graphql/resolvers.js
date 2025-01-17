import { gql } from 'apollo-boost';
import { 
  addItemToCart, 
  removeItemFromCart,
  clearItemFromCart,
  getCartTotal,
  getCartItemCount 
} from './cart.utils';
import { 
  GET_CART_HIDDEN,
  GET_CART_ITEMS,
  GET_CART_TOTAL,
  GET_CURRENT_USER,
  GET_ITEM_COUNT
} from './queries'

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type DateTime {
    nanoseconds: Int!
    seconds: Int!
  }

  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]
    RemoveItemFromCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
    SetCurrentUser(user: User!): User!
  }
`

const updateCartItemsRelatedQueries = (cache, newCartItems) => {
  cache.writeQuery({
    query: GET_ITEM_COUNT,
    data: { itemCount: getCartItemCount(newCartItems) }
  })

  cache.writeQuery({
    query: GET_CART_TOTAL, 
    data: { cartTotal: getCartTotal(newCartItems) }
  })

  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCartItems }
  })
}

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

      updateCartItemsRelatedQueries(cache, newCartItems)

      return newCartItems
    },

    removeItemFromCart: (_, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      })

      const newCartItems = removeItemFromCart(cartItems, item)

      updateCartItemsRelatedQueries(cache, newCartItems)

      return newCartItems
    },

    clearItemFromCart: (_, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      })

      const newCartItems = clearItemFromCart(cartItems, item)

      updateCartItemsRelatedQueries(cache, newCartItems)

      return newCartItems
    },

    setCurrentUser: (_, { user }, { cache }) => {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: user }
      })
    }
  }
}