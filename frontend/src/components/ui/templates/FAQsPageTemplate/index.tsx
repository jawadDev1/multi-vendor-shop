import  { useState } from "react";
import PageWrapper from "../../atoms/PageWrapper";
import SectionTitle from "../../atoms/typography/SectionTitle";
import Faq from "../../atoms/Faq";
import { FAQS } from "@/constants/static";

const FAQsPageTemplate = () => {
  const [selectedFaq, setSelectedFaq] = useState<string | number>(-1);

  const handleFaq = (id: string | number) => {
    if (selectedFaq === id) return setSelectedFaq(-1);
    setSelectedFaq(id);
  };

  return (
    <PageWrapper>
      <SectionTitle>FAQ's</SectionTitle>

      <div className="flex flex-col gap-y-6 lg:gap-y-4 mt-6 lg:mt-7 bg-white shadow rounded px-5 lg:px-2 py-4 ">
        {FAQS.map(({ id, question, answer }, i) => (
          <>
            <Faq
              key={id}
              open={selectedFaq === id}
              question={question}
              answer={answer}
              handleFaq={handleFaq}
              id={id}
            />
            {i !== FAQS.length - 1 && (
              <div className="w-full h-px bg-light-gray"></div>
            )}
          </>
        ))}
      </div>
    </PageWrapper>
  );
};

export default FAQsPageTemplate;
