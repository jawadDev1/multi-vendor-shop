import BestDealsSection from "../../organisms/home/BestDealsSection";
import CategoriesSection from "../../organisms/home/CategoriesSection";
import FeaturedProductsSection from "../../organisms/home/FeaturedProductsSection";
import FeaturesSection from "../../organisms/home/FeturesSection";
import HeroSection from "../../organisms/home/HeroSection";
import PopularEvents from "../../organisms/home/PopularEvents";

const HomePageTemplate = () => {
  return (
    <main className="max-w-[1200px mx-auto bg-gray-50  flex flex-col gap-y-11 lg:gap-y-20">
      <HeroSection />
      <div className="px-5 lg:px-2 flex flex-col gap-y-11 lg:gap-y-20">
        <FeaturesSection />

        <CategoriesSection />

        <BestDealsSection />
        <PopularEvents />

        <FeaturedProductsSection />
      </div>
    </main>
  );
};

export default HomePageTemplate;
