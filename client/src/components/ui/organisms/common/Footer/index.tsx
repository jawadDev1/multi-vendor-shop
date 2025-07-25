import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import { COMPANY_LINKS, SUPPORT_LINKS } from "@/constants/data";
import NextImage from "@/components/ui/atoms/common/NextImage";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 lg:mt-20">
      {/* <NewsLetter /> */}

      <div className="bg-charcoal pt-7 lg:pt-10 pb-6 px-5">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-x-5 lg:gap-x-20">
          <div>
            <div className="w-20">
             <NextImage src={'/images/logo.png'} className="object-fill" />
            </div>
            <Subtitle2 className="text-white mt-4 lg:max-w-[300px] ">
              The home and elements needed to create beautiful products
            </Subtitle2>

            <div className="flex items-center gap-x-3 mt-2 ">
              <Link
                href={"https://www.linkedin.com/in/jawad-ali-937343314"}
                target="_blank"
              >
                <AiFillLinkedin size={28} color="white" />
              </Link>
              <Link href={"https://github.com/jawadDev1"} target="_blank">
                <AiFillGithub size={28} color="white" />
              </Link>
            </div>
          </div>

          <div className="grid flex-1 mt-5 lg:mt-0  grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            <div>
              <Subtitle2 className="text-white !font-semibold">
                Company
              </Subtitle2>
              <div className="flex flex-col gap-y-2 mt-3">
                {COMPANY_LINKS.map((link) => (
                  <Subtitle3 key={link.to} className="text-white">
                    <Link href={link.to}>{link.title}</Link>
                  </Subtitle3>
                ))}
              </div>
            </div>
            <div>
              <Subtitle2 className="text-white !font-semibold">Shop</Subtitle2>
              <div className="flex flex-col gap-y-2 mt-3">
                {COMPANY_LINKS.map((link) => (
                  <Subtitle3 key={link.to} className="text-white">
                    <Link href={link.to}>{link.title}</Link>
                  </Subtitle3>
                ))}
              </div>
            </div>
            <div>
              <Subtitle2 className="text-white !font-semibold">
                Support
              </Subtitle2>
              <div className="flex flex-col gap-y-2 mt-3">
                {SUPPORT_LINKS.map((link) => (
                  <Subtitle3 key={link.to} className="text-white">
                    <Link href={link.to}>{link.title}</Link>
                  </Subtitle3>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
