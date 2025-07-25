import Subtitle2 from "../../../atoms/typography/Subtitle2";
import LinkButton from "../../../atoms/buttons/LinkButton";

const HeroSection = () => {
  return (
    <div
      className="relative w-full flex items-center min-h-[70vh] lg:min-h-[87vh] bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url(/images/hero.jpg)" }}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-black/60" />
      <div className="max-w-[800px] mx-auto px-5 lg:px-0 z-10 ">
        <h1 className="text-heading-sm lg:text-heading text-white">
          Discover, Shop, and Sell — All in One Marketplace
        </h1>

        <Subtitle2  className="mt-3 text-white">
          Explore a vibrant multi-vendor platform where trusted sellers connect
          with buyers worldwide. From unique local products to global brands,
          shop with confidence or open your store and reach thousands of
          customers — all in one seamless experience.
        </Subtitle2>

        <LinkButton href="/products" className="max-w-36 py-3 mt-5">
            Shop Now
        </LinkButton>
      </div>
    </div>
  );
};

export default HeroSection;
