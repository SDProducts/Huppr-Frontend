import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsLetter() {
  return (
    <section className="my-[2rem] bg-secondary-brand">
      <div className=" mx-auto px-8 sm:px-12 lg:px-20 text-center py-12 rounded-[2.5rem] space-y-5">
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Stay Ahead
        </h2>
        <p className="text-indigo-100 text-lg max-w-[50ch] mx-auto leading-relaxed">
          Get the latest HR trends, career advice, and template releases
          delivered straight to your inbox every week.
        </p>
        <form className="flex items-center justify-center gap-4 pt-8 max-w-[45ch] mx-auto ">
          <Input className="px-4 py-[1.5rem] bg-white" />
          <Button
            size="lg"
            variant="secondary"
            type="submit"
            className="p-[1.5rem] backdrop-blur-sm bg-white/20 text-white hover:bg-white/10"
          >
            Subscribe
          </Button>
        </form>
        <small className="text-indigo-100 font-light max-w-[50ch] mx-auto leading-relaxed">
          We care about your data. See our Privacy Policy.
        </small>
      </div>
    </section>
  );
}
