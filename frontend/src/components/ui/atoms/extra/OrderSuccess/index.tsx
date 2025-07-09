import Lottie from "react-lottie";
import animation from "@/assets/order-success.json";

const OrderSuccess = () => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <Lottie
        options={{
          loop: true,
          animationData: animation,
          autoplay: true,
          rendererSettings: { preserveAspectRatio: "xMidYMid " },
        }}
        width={300}
        height={300}
      />
    </div>
  );
};

export default OrderSuccess;
