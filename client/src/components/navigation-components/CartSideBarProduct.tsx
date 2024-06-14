import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CartSideBarProductModel from './cart.side.bar.product.model'
import { useAppDispatch } from '../../redux/hooks'
import {
    decreaseQuantity,
    deleteFromCart,
    editCart,
    increaseQuantity,
} from '../../redux/cart'

import './CartSideBarProduct.scss'

const CartSideBarProduct: React.FC<CartSideBarProductModel> = ({
    name,
    price,
    product_img,
    code,
    color,
    quantity,
}) => {
    const [over, setOver] = useState(false)

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
        <div
            className="product"
            onMouseOver={() => {
                setOver(true)
            }}
            onMouseOut={() => {
                setOver(false)
            }}
        >
            <div
                className={over ? 'product__remove active' : 'product__remove'}
                onClick={removeHandler}
            >
                x
            </div>
            <Link
                to={color === undefined ? `/teas/${code}` : `/extras/${code}`}
                state={{
                    prevPath:
                        location.pathname === '/'
                            ? '/'
                            : `${color === undefined ? '/teas' : '/extras'}`,
                }}
                onClick={closeCart}
            >
                <img src={product_img} alt="herbs" />
            </Link>
            <div className="details">
                <h3 className="details__name">{name}</h3>
                <p className="details__price">${Number(price).toFixed(2)}</p>
                <div className="details__input-number">
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
            </div>
        </div>
    )
}

export default CartSideBarProduct
