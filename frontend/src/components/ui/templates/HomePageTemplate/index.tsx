import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import SectionWrapper from "../../atoms/SectionWrapper";
import HeroSection from "../../organisms/HeroSection";
import Subtitle from "../../atoms/typography/Subtitle";
import Content from "../../atoms/typography/Content";
import { IoMdArrowDropupCircle, IoMdArrowRoundBack, IoMdClock } from "react-icons/io";
import RepeatArrow from "@/components/icons/RepeatArrow";
import Cart from "@/components/icons/Cart";

const HomePageTemplate = () => {
  return (
    <>
      <HeroSection />

      <SectionWrapper className="mt-7 pb-96">
        <div className="bg-white rounded-md px-5  py-3 shadow grid grid-cols-2 md:grid-cols-4">
          <div className="flex gap-x-3">
            <Cart color="yellow" className={"size-12"} />
            <div>
              <Subtitle>Free Shipping</Subtitle>
              <Content>From all orders over 100$</Content>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default HomePageTemplate;
