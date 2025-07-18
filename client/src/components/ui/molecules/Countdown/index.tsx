"use client";

import { getTimeLeft } from "@/utils";
import React, { useEffect, useState } from "react";
import Subtitle from "../../atoms/typography/Subtitle";

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
      <Subtitle className="text-tomato-red font-[500] text-sm">
        Time’s up!
      </Subtitle>
    );
  }

  return (
    <Subtitle className="text-charcoal-gray font-[500]">
      {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes{" "}
      {timeLeft.seconds} seconds
    </Subtitle>
  );
};

export default Countdown;
