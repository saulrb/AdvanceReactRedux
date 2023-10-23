import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { sendCartData, fetchCartData } from './store/cart-actions'
import Notification from './components/UI/Notification'

let isInitial = true

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }
    if (cart.changed === false) {
      return
    }

    dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return (
    <Layout>
      {showCart && <Cart />}
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Products />
    </Layout>
  )
}

export default App
