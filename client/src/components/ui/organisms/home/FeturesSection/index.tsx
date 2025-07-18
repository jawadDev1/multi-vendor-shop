import SectionWrapper from "../../../atoms/SectionWrapper";
import { FEATURES } from "@/constants/static";
import Subtitle2 from "../../../atoms/typography/Subtitle2";

const FeaturesSection = () => {
  return (
    <SectionWrapper >
      <div className="bg-white rounded-md px-5  py-3 shadow grid grid-cols-1 gap-y-8  md:grid-cols-4">
        {FEATURES.map(({ Icon, subtitle, title }) => (
          <div key={title} className="flex gap-x-5 lg:gap-x-2">
            <Icon color="yellow" className={"size-11"} />
            <div>
              <Subtitle2 className="!font-semibold"> {title}</Subtitle2>
              <p className="text-sm text-charcoal-gray">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FeaturesSection;
