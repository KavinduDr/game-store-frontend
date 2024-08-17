import React from 'react'
import "./checkOut.scss"
import { Link } from 'react-router-dom'

const CheckOut = () => {
  return (
    <div className="checkOut">
        <h1>Check Out</h1>
        <form action="" className='formCheckout'>
            <div className="name">
                <label htmlFor="">Name:</label>
                <input type="text" />
            </div>
            <div className="cardDetails">
                <label htmlFor="">Card No:</label>
                <input type="number" />
            </div>
            <div className="shippingDetails">
                <label htmlFor="">Shipping Address:</label>
                <input type="text" placeholder='Lane 1' />
                <input type="text" placeholder='Lane 2' />
                <input type="text" placeholder='District' />
            </div>
            <div className="submit">
                <button type="submit">Check Out</button>
            </div>
        </form>
        <Link to="/cart"><h4>Back to Cart</h4></Link>
    </div>
  )
}

export default CheckOut