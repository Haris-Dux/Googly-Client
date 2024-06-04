import BestSeller from "./BestSeller";
import Features from "./Features";
import HeroSection from "./HeroSection";
import HomeBlogs from "./HomeBlogs";
import HomeCategories from "./HomeCategories";
import PopularProducts from "./PopularProducts";

const HomePage = () => {
  return (
    <>
      <HeroSection />

      <Features />

      <HomeCategories />

      <BestSeller />

      <PopularProducts />

      <HomeBlogs />
    </>
  );
};

export default HomePage;
