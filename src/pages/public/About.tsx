import Breadcrumb from "../../shared/header/Breadcrumb";
import sideImage from "../../assets/images/Side-Image.png"
import { aboutData, ReportData, servicesData } from "../../data/data";
import ReportCard from "../../components/about/ReportCard";
import AboutCard from "../../components/about/AboutCard";
import ServiceCard from "../../components/home/ServiceCard";

const About = () => {
    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "About" },
                ]} />
            <section id="about-us" className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/*story */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-24">
                        <div className="space-y-6">
                            <h1 className="text-5xl font-bold tracking-wider text-black dark:text-white">Our Story</h1>
                            <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
                                <p>Launced in 2015, Exclusive is South Asia's premier online shopping marketplace with an active
                                    presence in Bangladesh. Supported by wide range of tailored marketing, data and service
                                    solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers
                                    across the region.</p>
                                <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers
                                    a diverse assortment in categories ranging from consumer.</p>
                            </div>
                        </div>
                        <div className="rounded-sm overflow-hidden shadow-xl">
                            <img src={sideImage} alt="Our Story" className="w-full h-auto object-cover" />
                        </div>
                    </section>
                    {/*story-end */}
                    {/*reports */}
                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {ReportData.map((item, index) => (
                            <ReportCard
                                key={index}
                                icon={item.icon}
                                count={item.count}
                                title={item.title}
                            />
                        ))}

                    </section>
                    {/*end-reports */}

                    {/*about-us */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {aboutData.map((item, index) => (
                            <AboutCard
                                key={index}
                                img={item.img}
                                name={item.name}
                                position={item.position}
                            />
                        ))}
                        {/*Slider indicators */}
                        <div
                            className="col-span-full flex justify-center space-x-3 mt-10 [&_button]:w-3 [&_button]:h-3 [&_button]:rounded-full [&_button]:bg-gray-400 [&_button]:hover:bg-primary [&_button]:transition-colors [&_button]:duration-300 [&_button]:cursor-pointer">
                            <button type="button" aria-label="Slide 1"></button>
                            <button type="button" aria-label="Slide 2"></button>
                            <button type="button" className="bg-primary!" aria-label="Slide 3"></button>
                            <button type="button" aria-label="Slide 4"></button>
                            <button type="button" aria-label="Slide 5"></button>
                        </div>
                    </section>
                    {/* services */}
                    <section id="services" className="py-20 mb-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div
                                className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-24 text-center [&_h3]:font-bold [&_h3]:uppercase t[&_h3]:ext-lg [&_h3]:font-inter [&_p]:text-sm [&_p]:text-gray-600 [&_p]:dark:text-gray-400">
                                {servicesData.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        title={service.title}
                                        description={service.description}
                                        icon={service.icon}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
};

export default About;