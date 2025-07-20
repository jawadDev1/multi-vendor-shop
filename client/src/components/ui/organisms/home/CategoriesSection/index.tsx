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
    <SectionWrapper className="flex overflow-x-auto overflow-y-hidden  gap-x-7 py-3 px-2 rounded">
      {categories.map(({ title, slug, image }) => (
        <Link
          href={`/categories/${slug}`}
          key={slug}
          className=" max-w-[200px] shrink-0 max-h-[200px] h-full w-full md:h-[230px] overflow-hidden md:max-w-[230px] md:max-h-[230px]"
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <NextImage src={image} className="object-cover" />
          </div>
          <Subtitle2 className="mt-2 text-center !font-[500]">
            {title}
          </Subtitle2>
        </Link>
      ))}
      <Link
        href={`/others`}
        className=" max-w-[200px] max-h-[200px] h-full w-full md:max-w-[230px] lg:max-h-[230px]"
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          <NextImage
            src={
              "https://fra.cloud.appwrite.io/v1/storage/buckets/684e96b80016377e4125/files/686e11000030713702e1/view?project=684e94f90013f10e113b"
            }
          />
        </div>
        <Subtitle2 className="mt-2 text-center !font-[500]">Others</Subtitle2>
      </Link>
    </SectionWrapper>
  );
};

export default CategoriesSection;
