import ProductList from "components/ProductList";
import products from "data";

const App = () => {
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default App;
