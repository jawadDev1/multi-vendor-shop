import Image from "../../common/Image";
import CardTitle from "../../typography/CardTitle";
import Content from "../../typography/Content";
import Subtitle2 from "../../typography/Subtitle2";

const CartItem = () => {
  return (
    <div className="grid grid-cols-[10%,20%,70%] gap-x-3 w-full pt-4 lg:pt-6 border-t border-dim-gray/30">
      <div className="space-y-1 flex flex-col items-center ">
        <button className="size-6 rounded-full bg-green-500 text-white flex items-center justify-center leading-none">
          +
        </button>
        <div className="text-sm text-primary">1</div>
        <button className="size-6 rounded-full bg-green-500 text-white flex items-center justify-center leading-none">
          -
        </button>
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
    </div>
  );
};

export default CartItem;
