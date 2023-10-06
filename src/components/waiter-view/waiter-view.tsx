import { useEffect } from "react";
import OrderForm from "../order-form/order-form";
import ProductList from "../product-list/product-list";

const  WaiterView = () => {
    const [client, setClient] = useState("Kvn");
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:8080/products")
            .then((response) => {
                setProducts(response.products);
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