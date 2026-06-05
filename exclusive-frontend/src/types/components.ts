import type { LucideIcon } from "lucide-react";
import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

// home components
export interface ViewAllProductButttonProps {
  title: string;
  end?: boolean;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export interface ProductCardProps {
  id: string;
  title: string;
  newPrice: number;
  oldPrice?: number;
  image: string;
  discount?: number;
  rating: number;
  review: number;
  colors?: string[];
  category?: string;
}

export interface FeaturedCollectionCardProps {
  item: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  index: number;
}

export interface CountdownProps {
  targetDate: Date;
  variant?: "sales" | "ads";
}

export interface CategorieCardProps {
  name: string;
  icon: LucideIcon;
}

export interface ScrollButtonsProps {
  prevClass: string;
  nextClass: string;
}

// about page components
export interface ReportCardProps {
  title: string;
  icon: LucideIcon;
  count: string;
}

export interface AboutCardProps {
  img: string
  name: string
  position: string
}

// auth components
export interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  type?: string;
  style?: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
}

// shared components
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// faq page components
export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title: string;
  icon: LucideIcon;
  questions: FAQItemProps[];
}