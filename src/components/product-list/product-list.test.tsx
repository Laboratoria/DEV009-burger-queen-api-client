import { render, screen } from "@testing-library/react";
import ProductList from "./product-list";
import { Products } from "../../models/products-model";
import '@testing-library/jest-dom'


describe("ProductList Component", () => {
  it("should render 'No products available' message when no products are provided", () => {
    const products: Products[] = [];
    render(<ProductList products={products} />);
    const noProductsMessage = screen.getByText("No products available.");
    expect(noProductsMessage).toBeInTheDocument();
  });

  it("should render a list of products when products are provided", () => {
    const products: Products[] = [
      { name: "Product 1", price: 10 },
      { name: "Product 2", price: 15 },
      { name: "Product 3", price: 20 },
    ];
    render(<ProductList products={products}/>);

    products.forEach((product) => {
      const productElement = screen.getByText(product.name);
      expect(productElement).toBeInTheDocument();
    });
  });
});
