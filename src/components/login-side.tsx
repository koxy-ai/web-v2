"use client";

import TestimonialCard from "@/components/testimonial-card";
import testimonials, { Testimonial } from "@/config/testimonials";
import randomItem from "@/utils/random";
import { useEffect, useState } from "react";

export default function LoginSide() {
  const [testimonial, setTestimonial] = useState<Testimonial>();

  useEffect(() => {
    if (!testimonial) {
      setTestimonial(randomItem<Testimonial>(testimonials));
    }
  }, []);

  return (
    <>
      <div className="w-full h-full p-10 bg-accent/10 flex flex-col relative justify-end gap-3">
        <div className="mb-10 w-full h-full flex items-center justify-center z-10">
          {testimonial && (
            <TestimonialCard
              testimonial={testimonial}
              className="rotate-[-5deg] shadow-md"
            />
          )}
        </div>
        {/* <h3 className="text-2xl font-semibold z-10">Welcome to Koxy AI!</h3>
        <p className="opacity-70">
          Build your AI-powered back-end in minutes with no-code
        </p> */}
        <div className="absolute top-0 left-0 dots1 z-0 opacity-50"></div>
      </div>
    </>
  );
}
