import React from "react";
import ProductsGrid from "../components/productsGrid";
import ShopDetail from "../components/shopDetail";
import CategoriesSlider from "../components/sliders/categoriesSlider";
import FeaturedProducts from "../components/sliders/featuredProducts";
import { useSelector } from "react-redux";

const Home = () => {
  const { products } = useSelector((state) => state.DataReducer);
  return (
    <main className="main">
      <FeaturedProducts />
      <CategoriesSlider />
      <ProductsGrid products={products} />
      <ShopDetail />
    </main>
  );
};

export default Home;
