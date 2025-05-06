import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "components/Header";
import Navbar from "components/Navbar";
import ProductList from "components/ProductList";
import Pagination from "components/Pagination";
import AddProduct from "components/AddProduct";
import EditProduct from "components/EditProduct";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_PRODUCT_URL}?page=${currentPage}&page_size=${PAGE_SIZE}`
      );
      const data = await response.json();
      setProducts(data.results);
      setTotalPages(Math.ceil(data.count / PAGE_SIZE));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <Header />
                <ProductList products={products} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )
          }
        />
        <Route
          path="/add-product"
          element={<AddProduct onProductCreated={fetchProducts} />}
        />
        <Route
          path="/edit-product/:id"
          element={<EditProduct onProductCreated={fetchProducts} />}
        />
      </Routes>
    </>
  );
};

export default App;
