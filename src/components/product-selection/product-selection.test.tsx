import { render, fireEvent, screen } from "@testing-library/react";
import ProductTable, { Product, ProductTableProps } from "./product-selection";
import '@testing-library/jest-dom'

const products: Product[] = [
    {
        id: 1,
        name: "Americano",
        price: 10,
        type: "Breakfast",
        image: "americano.jpg",
    },
    {
        id: 2,
        name: "Juice",
        price: 15,
        type: "Lunch",
        image: "juice.jpg",
    },
];

const mockOnProductSelect = jest.fn();

const productTableProps: ProductTableProps = {
    products,
    onProductSelect: mockOnProductSelect,
};

describe("ProductTable Component", () => {
    it("should render a table with product data", () => {
        render(<ProductTable {...productTableProps} />);

        products.forEach((product) => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        });

        const selectButtons = screen.getAllByRole("button");
        expect(selectButtons).toHaveLength(products.length);
    });

    it("should call onProductSelect when a product is selected", () => {
        render(<ProductTable {...productTableProps} />);

        const selectButton = screen.getAllByTestId("select-button")[0];
        fireEvent.click(selectButton);

        expect(mockOnProductSelect).toHaveBeenCalledWith(products[0]);
    });
});
