import { render, fireEvent, screen } from '@testing-library/react';
import OrderForm from './order-form';
import '@testing-library/jest-dom'


describe('OrderForm Component', () => {
  const selectedProducts = [
    { product: { id: 1, name: 'Product 1', price: 10, type: 'Type 1', image: 'image1.jpg' }, qty: 2 },
    { product: { id: 2, name: 'Product 2', price: 15, type: 'Type 2', image: 'image2.jpg' }, qty: 3 },
  ];

  const onRemoveProduct = jest.fn();

  it('should render OrderForm with selected products', () => {
    render(
      <OrderForm
        id="1"
        client="Paola"
        selectedProducts={selectedProducts}
        onRemoveProduct={onRemoveProduct}
        updateProductQty={() => {}}
      />
    );

    expect(screen.getByText('Selected Products:')).toBeInTheDocument();
    selectedProducts.forEach((product) => {
      expect(screen.getByText(`${product.product.name} (${product.qty})`)).toBeInTheDocument();
    });

    const sendOrderButton = screen.getByText('Send Order');
    fireEvent.click(sendOrderButton);

  });

  it('should trigger onRemoveProduct when removing a product', () => {
    render(
      <OrderForm
        id="1"
        client="Paola"
        selectedProducts={selectedProducts}
        onRemoveProduct={onRemoveProduct}
        updateProductQty={() => {}}
      />
    );

    const removeButton = screen.getAllByText('Remove')[0];

    fireEvent.click(removeButton);

    expect(onRemoveProduct).toHaveBeenCalledWith(selectedProducts[0].product);
  });

});
