import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface VAFAQProps {
  faqs: FAQ[];
}

const VAFAQ = ({ faqs }: VAFAQProps) => {
  return (
    <section className="py-16 bg-cream" id="faq">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about our Virtual Assistant Masterclass.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <details 
              key={index}
              className="bg-white rounded-lg shadow-sm cursor-pointer reveal"
            >
              <summary className="flex items-center justify-between p-6 text-lg font-medium">
                {faq.question}
                <ChevronDown size={20} className="text-primary transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VAFAQ;
