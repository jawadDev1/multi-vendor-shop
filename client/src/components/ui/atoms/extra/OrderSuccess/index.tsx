import Lottie from "react-lottie";

const OrderSuccess = () => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <Lottie
        options={{
          loop: true,
          animationData: "animations/order-success.json",
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
