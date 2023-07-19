import React from 'react'

import { useSelector } from 'react-redux'

const Cart = () => {
    
  const product = useSelector(state => state.cart)
  return (
    <div>
        {JSON.stringify(product)}
    </div>
  )
}

export default Cart