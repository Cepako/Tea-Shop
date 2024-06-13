import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./product-details-components/Header";
import Product from "./product-details-components/Product";
import ProductInfo from "./product-details-components/ProductInfo";
import Slider from "../slider/Slider";

import "./ProductDetails.scss";
import { TailSpin } from "react-loader-spinner";

type ProductType = {
  type: string;
  images: { main: string; hover?: string | undefined };
  name: string;
  price: string;
  _id: string;
  size?: string | undefined;
  color?: string[] | undefined;
  description: string;
  info: string;
};

const ProductDetails: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState({
    product: false,
    products: false,
  });
  const [isError, setIsError] = useState({ product: "", products: "" });
  const [product, setProduct] = useState<ProductType | null>(null);

  const { productLink } = useParams<string>();

  useEffect(() => {
    setIsLoading((prevState) => ({
      ...prevState,
      product: true,
    }));
    const fetchProd = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/product/${productLink}`,
        );
        if (!response.ok) {
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        console.error("Fetch error:", err);
        setIsError((prevState) => ({
          ...prevState,
          product: "Failed to fetch products. Try again later.",
        }));
      } finally {
        setIsLoading((prevState) => ({
          ...prevState,
          product: false,
        }));
      }
    };
    fetchProd();
  }, [productLink]);

  useEffect(() => {
    setIsLoading((prevState) => ({
      ...prevState,
      products: true,
    }));
    const fetchProds = async () => {
      try {
        const response = await fetch("http://localhost:8080/shop/products");
        if (!response.ok) {
        }
        const data = await response.json();
        const shuffledArr = shuffle(data.products);
        setProducts(shuffledArr);
      } catch (err) {
        console.error("Fetch error:", err);
        setIsError((prevState) => ({
          ...prevState,
          products: "Failed to fetch products. Try again later.",
        }));
      } finally {
        setIsLoading((prevState) => ({
          ...prevState,
          products: false,
        }));
      }
    };
    fetchProds();
  }, []);

  const shuffle = (arr: ProductType[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  return (
    <div className="tea-details">
      <Header />
      <TailSpin
        visible={isLoading.product}
        height="80"
        width="80"
        color="#242a35"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="spinner"
      />
      {!isError.product && !isLoading.product && product !== null && (
        <>
          <Product
            key={productLink}
            type={product.type}
            name={product.name}
            price={product.price}
            code={product._id}
            size={product.size}
            color={product.color}
            product_img={`http://localhost:8080/images/${product.images.main}`}
            hover_img={
              product.images.hover !== undefined
                ? `http://localhost:8080/images/${product.images.hover}`
                : ""
            }
            product_description={product.description}
          />
          <ProductInfo product_info={product.info} />
        </>
      )}
      {isError.product && <p className="error">{isError.product}</p>}

      <h3 className="tea-details__related">Related Products</h3>
      <TailSpin
        visible={isLoading.products}
        height="80"
        width="80"
        color="#242a35"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="spinner"
      />
      <div className="tea-details__slider">
        {!isError.products && !isLoading.products && (
          <Slider
            key={productLink}
            removeArrowOnDeviceType={[]}
            data={products}
          />
        )}
      </div>
      {isError.products && <p className="error">{isError.products}</p>}
    </div>
  );
};

export default ProductDetails;
