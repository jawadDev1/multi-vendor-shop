import Image from "@/components/ui/atoms/common/Image";
import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import { HOME_CATEGORIES } from "@/constants/static";
import { Link } from "react-router";

const CategoriesSection = () => {
  return (
    <SectionWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-7 py-3 px-2 rounded">
      {HOME_CATEGORIES.map(({ title, id, image }) => (
        <Link
          to={`/products?category=${id}`}
          key={id}
          className=" items-center gap-x-2"
        >
          <div className="w-full h-[200px] rounded-md overflow-hidden">
            <Image src={image} />
          </div>
          <Subtitle2 className="mt-2">{title}</Subtitle2>
        </Link>
      ))}
    </SectionWrapper>
  );
};

export default CategoriesSection;
