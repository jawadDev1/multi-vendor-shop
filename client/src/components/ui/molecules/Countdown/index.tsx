"use client";

import { getTimeLeft } from "@/utils";
import React, { useEffect, useState } from "react";
import Subtitle from "../../atoms/typography/Subtitle";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import Content from "../../atoms/typography/Content";

interface CountdownProps {
  targetDate: Date | string;
  start_date?: Date | string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!hasMounted) return null;

  if (timeLeft.total <= 0) {
    return (
      <Subtitle className="text-tomato-red font-[500] ">
        Time’s up!
      </Subtitle>
    );
  }

  return (
    <div>
      <Subtitle2>Hurry, Before It’s Too Late!</Subtitle2>
      <div className=" flex items-center gap-x-5 mt-2">
        <div className="shrink-0">
          <div className="bg-primary/20 shadow-lg text-content-sm md:text-subtitle rounded-xl size-10 md:size-14 flex justify-center items-center text-blue-gray font-roboto ">
            {timeLeft.days}
          </div>
          <Content className="mt-2 text-center">
            Days
          </Content>
        </div>
        <div>
          <div className="bg-primary/20 shadow-lg text-content-sm md:text-subtitle rounded-xl size-10 md:size-14 flex justify-center items-center text-blue-gray font-roboto ">
            {timeLeft.hours}
          </div>
          <Content className="mt-2 text-center">
           Hr 
          </Content>
        </div>
        <div>
          <div className="bg-primary/20 shadow-lg text-content-sm md:text-subtitle rounded-xl size-10 md:size-14 flex justify-center items-center text-blue-gray font-roboto ">
            {timeLeft.minutes}
          </div>
          <Content className="mt-2 text-center">
           Mins 
          </Content>
        </div>
        <div>
          <div className="bg-primary/20 shadow-lg text-content-sm md:text-subtitle rounded-xl size-10 md:size-14 flex justify-center items-center text-blue-gray font-roboto ">
            {timeLeft.seconds}
          </div>
          <Content className="mt-2 text-center">
           Sec 
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
