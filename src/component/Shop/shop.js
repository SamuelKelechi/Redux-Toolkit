import React, { useEffect } from 'react';
import "./shop.css";
import Review from "../pic/review.png";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';

const Shop = () => {

    const [products, setProducts] = React.useState([])

    const dispatch = useDispatch()

    const addToCart = (product) => {
        dispatch(add(product))
    }

    const getProducts = async () => {
         await axios.get('https://fakestoreapi.com/products')
        .then((response) => {
            setProducts(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log(products)


    useEffect(()=> {
        getProducts()
    }, [])

  return (
    <div className='container'>
        <marquee className="moving-text">My Shopping App</marquee>
        <div className='wrapper'>
            {
                products.map(product => (
            <div className='card' key={product.id}>
                <div className='up'>
                <img src={product.image} alt='img1' className='imagehold'/>
                </div>
                <button className='details-btn'>Details</button>
                <div className='down'>
                    <div className='downhold'>
                        <div className='content-hold'>
                            <strong className='title-contain'>{product.title}</strong>
                            <img src={Review} alt='img2'/>
                            <p><b>{product.price}</b></p>
                        </div>
                       <div  className='buttnhold' >
                         <button className='butt' onClick={() =>{addToCart(product)}}>Add to cart</button>
                     </div>
                    </div>
                
                </div>
            </div>
                ))
            }
        </div>
    </div>
  )
}

export default Shop