import Container from "@/components/Container";
import Title from "@/components/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsData } from "@/constants";
import React from "react";

const FagsPage = () => {
  return (
    <Container className="max-w-4xl ms:px-6 lg:px-8 py-12">
      <Title className="text-3xl">Frequently Asked Questions</Title>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        {faqsData?.map((faq, index) => (
          <AccordionItem key={index} value={`index-${index}`} className="group">
            <AccordionTrigger className="text-left text-lg font-semibold text-green-500/80 group-hover:text-green-500 hover:no-under line hoverEffect">
              {faq?.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">{faq?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default FagsPage;
