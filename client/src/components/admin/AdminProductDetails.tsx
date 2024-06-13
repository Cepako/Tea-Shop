import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import './AdminProductDetails.scss';

interface ProductDataInterface {
    name: string;
    price: number;
    type: string;
    group?: string;
    size?: string;
    images: {
        main: File | null;
        hover?: File | null;
    };
    color?: [string, string];
    description: string;
    info: string;
}

const AdminProductDetails: React.FC = () => {
    const {productId} = useParams();

    const [prodData, setProdData] = useState<ProductDataInterface>({
        name: '',
        price: 1,
        type: '',
        images: {main: null},
        description: '',
        info: '',
    });

    const [imageURLs, setImageURLs] = useState({
        main: '',
        hover: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(
                `http://localhost:8080/admin/product/${productId}`
            );
            if (!response.ok) {
            } else {
                const data = await response.json();
                setProdData({
                    ...data.product,
                    color:
                        data.product.color[0] || data.product.color[1]
                            ? [data.product.color[0], data.product.color[1]]
                            : ['', ''],
                });
                if (data.product.images.main) {
                    setImageURLs((prev) => ({
                        ...prev,
                        main: `http://localhost:8080/images/${data.product.images.main}`,
                    }));
                }
                if (data.product.images.hover) {
                    setImageURLs((prev) => ({
                        ...prev,
                        hover: `http://localhost:8080/images/${data.product.images.hover}`,
                    }));
                }
            }
        };

        if (productId) fetchProduct();
    }, [productId]);

    const additionalInfo =
        prodData.type === 'tea' ? (
            <>
                <h2>Group:</h2>
                <p>{prodData.group}</p>
                <h2>Size:</h2>
                <p>{prodData.size}</p>
            </>
        ) : (
            <>
                {prodData.color && prodData.color[0] && (
                    <>
                        <h2>Colors:</h2>
                        <p>
                            {prodData.color[0]}
                            {prodData.color[1] ? `, ${prodData.color[1]}` : ''}
                        </p>
                    </>
                )}
            </>
        );

    return (
        <div className='admin-prod-details'>
            <h1>{prodData.name}</h1>
            <div className='images'>
                <img src={imageURLs.main} alt='Product'/>
                {imageURLs.hover && <img src={imageURLs.hover} alt='Product'/>}
            </div>
            <div className='details'>
                <h2>Price:</h2>
                <p>${prodData.price.toFixed(2)}</p>
                <h2>Type:</h2>
                <p>{prodData.type}</p>
                {additionalInfo}
            </div>

            <h2>Description:</h2>
            <p>{prodData.description}</p>
            <h2>Information:</h2>
            <p>{prodData.info}</p>
        </div>
    );
};

export default AdminProductDetails;
