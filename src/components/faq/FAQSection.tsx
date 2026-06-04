import FAQItem from "./FAQItem";
import type { FAQSectionProps } from "../../types/components";

const FAQSection = ({ title, icon: Icon, questions }: FAQSectionProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Icon className="text-primary" />
                {title}
            </h2>

            <div className="space-y-4">
                {questions.map((question) => (
                    <FAQItem
                        key={question.question}
                        question={question.question}
                        answer={question.answer}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQSection;