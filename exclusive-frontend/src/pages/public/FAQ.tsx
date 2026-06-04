import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/header/Breadcrumb";
import FAQSection from "../../components/faq/FAQSection";
import { faqData } from "../../data/data";
import { Mail, Phone, Search } from "lucide-react";

const FAQ = () => {
    const [search, setSearch] = useState("");

    const filteredFaq = useMemo(() => {
        if (!search.trim()) return faqData;

        return faqData
            .map((section) => ({
                ...section,
                questions: section.questions.filter(
                    (item) =>
                        item.question
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.answer
                            .toLowerCase()
                            .includes(search.toLowerCase())
                ),
            }))
            .filter((section) => section.questions.length > 0);
    }, [search]);

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "FAQ" },
                ]}
            />

            <section id="faq" className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            Frequently Asked Questions
                        </h1>

                        <p className="text-gray-700 dark:text-gray-300">
                            Find answers to common questions about shopping with
                            Exclusive
                        </p>
                    </div>

                    <div className="mb-12">
                        <div className="relative">
                            <input
                                type="search"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search for answers..."
                                className="w-full border border-gray-300 rounded-lg py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary text-sm placeholder:text-secondary"
                            />

                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search />
                            </span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {filteredFaq.length > 0 ? (
                            filteredFaq.map((section) => (
                                <FAQSection
                                    key={section.title}
                                    title={section.title}
                                    icon={section.icon}
                                    questions={section.questions}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No results found.
                            </div>
                        )}
                    </div>

                    <div className="mt-16 p-8 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-300 text-center">
                        <h3 className="text-2xl font-bold mb-3">
                            Still Have Questions?
                        </h3>

                        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            Can't find what you're looking for? Our customer
                            support team is here to help you.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/contact-us" className="px-8 py-3 bg-primary text-white rounded-md hover:bg-hover-button transition-colors font-medium inline-flex items-center gap-2">
                                <Mail />
                                Contact Support
                            </Link>
                            {/* whatsapp */}
                            <Link to="https://wa.me/+201012983148" className="px-8 py-3 bg-white border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors font-medium inline-flex items-center gap-2">
                                <Phone />
                                Call Us
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default FAQ;