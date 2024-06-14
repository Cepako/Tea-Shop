import React, { useState, ChangeEvent, useRef, useEffect } from 'react'
import SearchProduct from './SearchProduct'
import loupe from '../../assets/loupe-icon.svg'
import { ProductType } from '../pages/ProductDetails'

import './Search.scss'

const Search: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [inputFocus, setInputFocus] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchProds = async () => {
            try {
                const response = await fetch('http://localhost:8080/shop/teas')
                if (!response.ok) {
                }
                const data = await response.json()
                setProducts(data.products)
            } catch (err) {
                console.error('Fetch error:', err)
            }
        }
        fetchProds()
    }, [])

    let productsList =
        products.length > 0
            ? products
                  .filter((product) => {
                      return searchValue.toLowerCase() === ''
                          ? product
                          : product.name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                  })
                  .map((product) => (
                      <SearchProduct
                          key={product._id}
                          link={product._id}
                          name={product.name}
                          product_img={`http://localhost:8080/images/${product.images.main}`}
                          setSearchValue={setSearchValue}
                      />
                  ))
            : ''
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                inputRef.current.blur()
                setInputFocus(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className="search">
            <label htmlFor="search">
                <input
                    id="search"
                    name="search"
                    type="text"
                    ref={inputRef}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    onChange={(e) => handleInputChange(e)}
                    value={searchValue}
                    placeholder="Search..."
                />
                <div
                    className={
                        searchValue && inputFocus ? 'remove active' : 'remove'
                    }
                    onClick={() => setSearchValue('')}
                >
                    X
                </div>
                <img src={loupe} alt="loupe" />
            </label>
            <div
                onMouseDown={(e) => e.preventDefault()}
                className={
                    inputFocus && productsList.length > 0
                        ? 'search__products active'
                        : 'search__products'
                }
            >
                <h2>
                    {searchValue && productsList.length > 0
                        ? 'Products'
                        : 'Trending Products'}
                </h2>
                <div className="products">{productsList}</div>
            </div>
        </div>
    )
}

export default Search
