import { type Testimonial } from "@/config/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({ testimonial, className }: Props) {
  return (
    <div
      className={`p-6 bg-background border rounded-2xl flex flex-col max-w-md gap-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Avatar className="border">
          <AvatarFallback content={testimonial.name[0]} />
          <AvatarImage src={testimonial.avatar} className="object-cover" />
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <div className="text-sm">{testimonial.name}</div>
          <div className="text-xs opacity-70">{testimonial.role}</div>
        </div>
      </div>
      <div className="text-sm opacity-80">{testimonial.message}</div>
    </div>
  );
}
