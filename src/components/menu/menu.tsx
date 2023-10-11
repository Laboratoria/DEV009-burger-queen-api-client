

const Menu = ({ }) => {
  return (
    <div>
      <ProductList editable={false} products={products} />
      <div>
        Creating order:
        <OrderForm client={client} />
      </div>
    </div>
  );
};

export default Menu;
