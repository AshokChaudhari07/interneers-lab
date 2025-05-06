import { useState, useEffect } from "react";
import Header from "components/Header";
import Navbar from "components/Navbar";
import ProductList from "components/ProductList";

const BASE_PRODUCT_URL = "http://127.0.0.1:8000/api/products/";
const PAGE_SIZE = 6;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_PRODUCT_URL}?page_size=${PAGE_SIZE}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setProducts(data.results || data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
};

export default App;
