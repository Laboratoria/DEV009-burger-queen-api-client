const  OrderForm = ({client}: {client: string}) => {
    return (<>
    <form>
        Your order {client}
        <label htmlFor="table">Table:</label>
        <input type="number" id="table" />
    </form>
    </>);
};

export default OrderForm;