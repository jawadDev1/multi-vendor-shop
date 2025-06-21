import { CgClose } from "react-icons/cg";
import Image from "../../common/Image";
import CardTitle from "../../typography/CardTitle";
import Content from "../../typography/Content";
import Subtitle2 from "../../typography/Subtitle2";

import CartPlus from "@/components/icons/CartPlus";

const WishlistItem = () => {
  const handleItem = () => {};
  return (
    <div className="grid grid-cols-[5%,20%,1fr,10%] gap-x-3 w-full pt-4 lg:pt-6 border-t border-dim-gray/30">
      <div className=" flex items-center ">
        <CgClose size={20} />
      </div>

      <div className="w-full h-20">
        <Image
          src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
          className="object-fill"
        />
      </div>

      <div className="space-y-">
        <CardTitle className="line-clamp-2">
          There is nothing to tell about this & just a random person
        </CardTitle>
        <Content>$999 * 1</Content>
        <Subtitle2 className="text-green-500">$912</Subtitle2>
      </div>

      <div className="flex items-center">
        <CartPlus className="size-6" />
      </div>
    </div>
  );
};

export default WishlistItem;
