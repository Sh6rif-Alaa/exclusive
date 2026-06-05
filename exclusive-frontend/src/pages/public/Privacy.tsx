import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/header/Breadcrumb";
import { privacyData } from "../../data/data";

const Privacy = () => {
    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Privacy Policy" },
                ]}
            />

            <section id="privacy" className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-4">
                            Privacy Policy
                        </h1>

                        <p className="text-gray-700 dark:text-gray-300">
                            Last updated: February 13, 2026
                        </p>
                    </div>

                    <div className="space-y-10">
                        {privacyData.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-2xl font-bold mb-4">
                                    {index + 1}. {section.title}
                                </h2>

                                {section.paragraphs?.map((paragraph, index) => (
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
                            </div>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4">
                            10. Contact Us
                        </h2>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            If you have any questions about this privacy policy
                            or our privacy practices, please contact us:
                        </p>

                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>Email:</strong> privacy@exclusive.com
                            </li>

                            <li>
                                <strong>Phone:</strong> +88015-88888-9999
                            </li>

                            <li>
                                <strong>Address:</strong> 111 Bijoy Sarani,
                                Dhaka, Bangladesh
                            </li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-8 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-300 dark:border-slate-700">
                        <h3 className="text-xl font-bold mb-3">
                            Questions About Privacy?
                        </h3>

                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            If you have any concerns about how we handle your
                            personal data, please don't hesitate to contact us.
                        </p>

                        <Link
                            to="/contact-us"
                            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-hover-button transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Privacy;