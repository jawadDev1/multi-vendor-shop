import React from "react";
import Lottie from "react-lottie";
import animation from "@/assets/loader.json";

const Loader = () => {
  

  return (
    <div className="w-full h-screen flex justify-center items-center">
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

export default Loader;
