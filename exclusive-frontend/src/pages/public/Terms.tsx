import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/header/Breadcrumb";
import { termsData } from "../../mockData/data";

const Terms = () => {
    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Terms of Use" },
                ]}
            />

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-4">
                        Terms of Use
                    </h1>

                    <p className="text-gray-700 dark:text-gray-300">
                        Last updated: February 13, 2026
                    </p>
                </div>

                <div className="space-y-10">
                    {termsData.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-2xl font-bold mb-4">
                                {index + 1}. {section.title}
                            </h2>

                            {section.content?.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                                >
                                    {paragraph}
                                </p>
                            ))}

                            {section.list && (
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                    {section.list.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.footer && (
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                                    {section.footer}
                                </p>
                            )}

                            {section.contacts && (
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        <strong>Email:</strong>{" "}
                                        {section.contacts[0]}
                                    </li>

                                    <li>
                                        <strong>Phone:</strong>{" "}
                                        {section.contacts[1]}
                                    </li>

                                    <li>
                                        <strong>Address:</strong>{" "}
                                        {section.contacts[2]}
                                    </li>
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-300 dark:border-slate-700">
                    <h3 className="text-xl font-bold mb-2">
                        Questions About Our Terms?
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        If you need clarification on any of our terms, please
                        reach out to our legal team.
                    </p>

                    <Link
                        to="/contact-us"
                        className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-hover-button transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Terms;