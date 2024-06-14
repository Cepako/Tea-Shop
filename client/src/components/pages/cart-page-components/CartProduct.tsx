import React, { ChangeEvent, MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/hooks'
import {
    increaseQuantity,
    editCart,
    decreaseQuantity,
    deleteFromCart,
} from '../../../redux/cart'
import CPModel from './cartProduct.model'

import './CartProduct.scss'

const CartProduct: React.FC<CPModel> = ({
    name,
    price,
    code,
    size,
    color,
    quantity,
    product_img,
}) => {
    const dispatch = useAppDispatch()

    const location = useLocation()

    const removeHandler = (event: MouseEvent) => {
        const payload = {
            code,
            color,
        }
        dispatch(deleteFromCart(payload))
        event.stopPropagation()
    }

    const increaseHandler = () => {
        const payload = {
            code,
            color,
        }
        dispatch(increaseQuantity(payload))
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantityValue =
            e.target.value === '' || Number(e.target.value) === 0
                ? 1
                : Number(e.target.value)

        const payload = {
            code,
            color,
            quantity: newQuantityValue > 999 ? 999 : newQuantityValue,
        }

        dispatch(editCart(payload))
    }

    const decreaseHandler = () => {
        const payload = {
            code,
            color,
        }
        dispatch(decreaseQuantity(payload))
    }
    const closeCart = () => {
        const cartSideBar = document.querySelector(
            '.cart-sidebar'
        ) as HTMLDivElement
        if (cartSideBar) cartSideBar.className = 'cart-sidebar'
    }
    return (
        <div className="product-cart">
            <div className="product-cart__remove" onClick={removeHandler}>
                x
            </div>
            <Link
                to={size === undefined ? `/extras/${code}` : `/teas/${code}`}
                state={
                    size === undefined
                        ? {
                              prevPath:
                                  location.pathname === '/' ? '/' : '/extras',
                          }
                        : {
                              prevPath:
                                  location.pathname === '/' ? '/' : '/teas',
                          }
                }
                onClick={closeCart}
            >
                <img src={product_img} alt="herbs" />
            </Link>
            <div className="product-cart__details">
                <h4 className="product-cart__details__name">{name}</h4>
                <p className="product-cart__details__price">
                    ${Number(price).toFixed(2)}
                </p>
                {size === undefined ? (
                    <p className="product-cart__details__size">
                        Color: {color === undefined ? 'Silver' : color}
                    </p>
                ) : (
                    <p className="product-cart__details__size">Size: {size}</p>
                )}

                <div className="product-cart__details__input">
                    <span
                        onClick={decreaseHandler}
                        style={
                            quantity === 1
                                ? {
                                      color: 'gray',
                                      fontWeight: '300',
                                      cursor: 'default',
                                  }
                                : {}
                        }
                    >
                        -
                    </span>
                    <input
                        type="number"
                        value={quantity}
                        onChange={inputHandler}
                    />
                    <span onClick={increaseHandler}>+</span>
                </div>
                <p className="product-cart__details__total-price">
                    ${(quantity! * Number(price)).toFixed(2)}
                </p>
            </div>
        </div>
    )
}

export default CartProduct
