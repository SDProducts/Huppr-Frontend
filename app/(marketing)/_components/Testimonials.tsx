/* eslint-disable react/no-unescaped-entities */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import QuoteIcon from "@/components/ui/quote-icon";
// import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "HeyHR changed our trajectory. We filled 10 critical roles in half the time it used to take, and now the management tools are keeping our culture strong as we scale.",
    author: "Sarah Jenkins",
    role: "CEO, FlowStream AI",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "The AI screening has been a game-changer for our hiring process. We're seeing better quality candidates and significantly less time spent on manual review.",
    author: "Michael Chen",
    role: "VP of People, CloudNova",
    rating: 5,
    featured: false,
  },
  {
    quote:
      "From job posting to onboarding, HeyHR has streamlined everything. Our HR team is now 3x more efficient.",
    author: "Jessica Park",
    role: "HR Director, Lumina Creative",
    rating: 5,
    featured: false,
  },
  {
    quote:
      "HeyHR changed our trajectory. We filled 10 critical roles in half the time it used to take, and now the management tools are keeping our culture strong as we scale.",
    author: "Sarah Jenkins",
    role: "CEO, FlowStream AI",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "The AI screening has been a game-changer for our hiring process. We're seeing better quality candidates and significantly less time spent on manual review.",
    author: "Michael Chen",
    role: "VP of People, CloudNova",
    rating: 5,
    featured: false,
  },
  {
    quote:
      "From job posting to onboarding, HeyHR has streamlined everything. Our HR team is now 3x more efficient.",
    author: "Jessica Park",
    role: "HR Director, Lumina Creative",
    rating: 5,
    featured: false,
  },
];

export default function Testimonials() {
  return (
    <section className="py-5 sm:py-10 lg:py-10 bg-indigo-900/5">
      <div className="px-4 sm:px-10 lg:px-20 full">
        <div className="text-center max-w-2xl mx-auto *:mx-auto mb-12 grid place-content-center gap-2">
          <Badge className="tracking-wide bg-primary-100/50 text-primary-badge text-xs font-semibold px-3 py-1">
            WHAT OUR CUSTOMERS SAY
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Loved by HR teams around the world
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="items-center overflow-x-clip overflow-y-visible full"
        >
          <CarouselContent className="h-full py-2">
            {testimonials.map((testimonial, idx) => (
              <CarouselItem
                key={idx}
                className="basis-auto **:transition-200 min-h-full"
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex gap-2 relative mx-auto justify-center mt-4">
            <CarouselPrevious className="static" />
            <CarouselNext className="static" />
          </div>
        </Carousel>
        {/*<div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border p-6 ${
                testimonial.featured
                  ? "border-indigo-200 shadow-xl shadow-indigo-100/50"
                  : "border-gray-100 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="font-semibold text-gray-900 text-sm">
                  {testimonial.author}
                </div>
                <div className="text-xs text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>*/}
      </div>
    </section>
  );
}
type TestimonialProps = {
  quote: string;
  author: string;
  photo?: string;
  role: string;
};

export const TestimonialCard = ({
  quote,
  author,
  photo,
  role,
}: TestimonialProps) => (
  <Card className=" hover:bg-primary hover:**:text-white self-center m-1 w-full max-w-[28rem] h-full">
    <CardContent className="grid gap-4 p-6 relative h-full">
      <QuoteIcon className="absolute top-0 right-8 aspect-auto w-8 text-primary/50" />
      <p className="text-gray-700 text-sm leading-relaxed italic">"{quote}"</p>
      <div className="grid gap-2 grid-cols-[auto_1fr] items-center">
        <Avatar size="lg">
          <AvatarImage src={photo} alt="@shadcn" />
          <AvatarFallback className="text-gray-200">
            {author[0].toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1 items-center">
          <strong className="font-semibold text-sm">{author}</strong>
          <div className="text-xs text-gray-500">{role}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);
