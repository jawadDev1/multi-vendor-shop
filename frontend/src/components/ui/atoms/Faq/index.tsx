import React from "react";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import { CgChevronDown } from "react-icons/cg";
import Content from "../../atoms/typography/Content";

interface FaqProps {
  question: string;
  answer: string;
  open: boolean;
  id: string | number;
  handleFaq: (faq: string | number) => void;
}

const Faq = ({ question, answer, open, id, handleFaq }: FaqProps) => {
  return (
    <div className="py-2 px-3 ">
      <Subtitle2
        onClick={() => handleFaq(id)}
        className="flex cursor-pointer justify-between items-center !font-semibold"
      >
        {question}
        <CgChevronDown size={24} />
      </Subtitle2>
      {open && <Content>{answer}</Content>}
    </div>
  );
};

export default Faq;
