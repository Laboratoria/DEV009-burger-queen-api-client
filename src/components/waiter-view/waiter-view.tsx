import { useEffect } from "react";
import { useState } from "react";
import OrderForm from "../order-form/order-form";
import ProductList from "../product-list/product-list";

const  WaiterView = () => {
    const [client, setClient] = useState("Kvn");
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:8080/products", {  headers: {
            "Content-Type": "application/json",
            authorization:"Bearer "+localStorage.getItem("accessToken")
          },} )
          .then (response=> response.json())
            .then((response) => {
                setProducts(response);
            })
    }, [])

    return (<>
    
        <div><ProductList editable={false} products={products} /></div>
        <div>Creating order: 
            <OrderForm client={client} />
        </div>
    </>);
};

export default WaiterView;