'use client';
import Button from "@/components/ui/atoms/buttons/Button";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="bg-azure-blue py-4 lg:py-8 px-5 lg:px-0">
      <div className="max-w-[1200px] text-white gap-y-3 w-full mx-auto flex flex-col lg:flex-row justify-between items-center">
        <SectionTitle className=" max-w-[400px]">
          <span className="text-green-400">Subscribe</span> us for get news,
          events and offers.
        </SectionTitle>

        <div className="grid grid-cols-[70%,30%] lg:grid-cols-[80%,20%] gap-x-2 max-w-[500px] w-full">
          <input
            type="text"
            className="w-full bg-white py-2 px-2 rounded "
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="bg-green-500">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
