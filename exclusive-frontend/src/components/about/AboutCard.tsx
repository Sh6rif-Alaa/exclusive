import type { AboutCardProps } from "../../types/components";
import Image from "../home/Image";

const AboutCard = ({ img, name, position }: AboutCardProps) => {
    return (
        <div className="space-y-4">
            <div
                className="bg-gray-100 dark:bg-dark-black rounded-sm p-10 pb-0 h-100 flex items-end justify-center overflow-hidden border border-gray-50 dark:border-none">
                <Image src={img} alt={name} className="h-[90%] transition-all duration-500" />
            </div>
            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-black dark:text-white">{name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{position}</p>
                <div className="flex gap-4 pt-2">
                    <i className="fa-brands fa-twitter cursor-pointer hover:text-primary"></i>
                    <i className="fa-brands fa-instagram cursor-pointer hover:text-primary"></i>
                    <i className="fa-brands fa-linkedin-in cursor-pointer hover:text-primary"></i>
                </div>
            </div>
        </div>
    );
}

export default AboutCard