import { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import './Products.css'
import { userInfo } from "../../services/DataStore";
 
const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://rental-system.onrender.com/product");
      const data = await res.json()
      if(userInfo.email) {
        const filteredData = data.products.filter((item) => item.ownerId !== userInfo.user.email)
        setProducts(filteredData)
      } else {
        setProducts(data.products)
      }
    }
    fetchData()
   
  }, [userInfo.email])
  
  return (
    <div className="flex flex-wrap justify-around gap-2 m-8">
      {products.map((item) => {
        return <ProductItem item={item} key={item.id}/>
      })}
    </div>
  );
};
export default Products;
