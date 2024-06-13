import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from './product-details-components/Header';
import Product from './product-details-components/Product';
import ProductInfo from './product-details-components/ProductInfo';
import data from '../../productsData';
import Slider from '../slider/Slider';

import './ProductDetails.scss';
import {TailSpin} from "react-loader-spinner";

type ProductType = {
    images: { main: string; hover?: string | undefined; };
    name: string;
    price: string;
    _id: string;
    size?: string | undefined;
    color?: string[] | undefined;
}[]


const ProductDetails: React.FC = () => {
    const [products, setProducts] = useState<ProductType>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const {productLink} = useParams<string>();

    const keyForProduct = `product-${productLink}`;

    const productData = data.filter((product) => product.link === productLink);

    useEffect(() => {
        setIsLoading(true);
        const fetchProds = async () => {
            try {
                const response = await fetch('http://localhost:8080/shop/products');
                if (!response.ok) {
                }
                const data = await response.json();
                const shuffledArr = shuffle(data.products)
                setProducts(shuffledArr);
            } catch (err) {
                console.error('Fetch error:', err);
                setIsError('Failed to fetch products. Try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProds();
    }, []);

    const {
        name,
        price,
        code,
        size,
        color,
        product_img,
        hover_img,
        product_description,
        product_info,
    } = productData[0];
    const shuffle = (arr: ProductType) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    return (
        <div className='tea-details'>
            <Header/>
            <Product
                key={keyForProduct}
                name={name}
                price={price}
                code={code}
                size={size}
                color={color}
                product_img={product_img}
                hover_img={hover_img}
                product_description={product_description}
            />
            <ProductInfo product_info={product_info}/>
            <h3 className='tea-details__related'>Related Products</h3>
            <TailSpin
                visible={isLoading}
                height='80'
                width='80'
                color='#242a35'
                ariaLabel='tail-spin-loading'
                radius='1'
                wrapperStyle={{}}
                wrapperClass='spinner'
            />
            <div className='tea-details__slider'>
                {!isError && !isLoading &&
                    <Slider
                        key={keyForProduct}
                        removeArrowOnDeviceType={[]}
                        data={products}
                    />}
            </div>
            {isError && (<p className='error'>{isError}</p>)}
        </div>
    );
};

export default ProductDetails;
