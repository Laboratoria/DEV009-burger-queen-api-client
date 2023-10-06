import { Products } from "../../models/products-model.d";


const  ProductList = ({products}: { products: Products[]}) => {
    return (<>
    <ul>
        Choose one:
        {
            products.map((p) => (<li>{p.name}</li>))
        }
    </ul>
    <div></div>
    </>);
};

export default ProductList;