import NextImage from "@/components/ui/atoms/common/NextImage";
import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import { IAPIUserCategory } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import Link from "next/link";

const CategoriesSection = async () => {
  const result = await getApiRequest("category/categories");

  if (!result?.success || result?.data?.length === 0) {
    return null;
  }

  const categories: IAPIUserCategory[] = result?.data;

  return (
    <SectionWrapper className="flex overflow-x-auto overflow-y-hidden hide-scrollbar  gap-x-7 py-3 px-2 rounded">
      {categories.map(({ title, slug, _id, image }) => (
        <Link
          href={`/products?category=${_id}`}
          key={slug}
          className=" max-w-[230px] shrink-0  w-full "
        >
          <div className="w-full  rounded-full overflow-hidden md:h-[230px] md:w-[230px]  md:max-w-[230px] md:max-h-[230px]">
            <NextImage src={image} className="object-cover" />
          </div>
          <Subtitle2 className="mt-2 text-center !font-[500]">
            {title}
          </Subtitle2>
        </Link>
      ))}
    </SectionWrapper>
  );
};

export default CategoriesSection;
