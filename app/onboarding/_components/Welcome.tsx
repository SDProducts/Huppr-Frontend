/* eslint-disable react/no-unescaped-entities */
"use client";
import WelcomeImage from "@/assets/Background+Border+Shadow.png";
import Button from "@/components/ui/CustomButton";
import {
  useGetOnboarding,
  useStartOnboarding,
} from "@/hooks/auth/useOnboarding";
import { ArrowRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();
  const { data, isLoading } = useGetOnboarding();
  const { mutate: startOnboarding, isPending } = useStartOnboarding();
  if (isLoading || !data) {
    return (
      <div className="animate-pulse text-xl h-full flex justify-center items-center">
        Resuming...
      </div>
    );
  }
  const handleStart = () => {
    if (data?.status === "in_progress") {
      router.push(`/onboarding/${data.nextAction}`);
    } else {
      startOnboarding(undefined, {
        onSuccess(data) {
          router.push(`/onboarding/${data.nextAction}`);
        },
      });
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="">
        <div className="">
          <Image
            src={WelcomeImage}
            alt="Onboarding image"
            loading="eager"
            className="h-75 w-auto mx-auto"
          />
        </div>
        <h2 className="text-3xl font-bold">Welcome to Huppr</h2>
        <p className="mt-2">
          Let's get your workspace ready. This only takes a couple of minutes.
        </p>
      </div>
      <div className="space-y-4 ">
        <Button
          label={data.status === "in_progress" ? "Continue" : "Get Started"}
          onClick={handleStart}
          isLoading={isPending}
          disabled={isLoading}
          loadingLabel="Starting..."
          className="text-xl w-fit! px-20 bg-primary text-white! mx-auto"
          rightIcon={<ArrowRight size={20} />}
        />
        <div className="flex items-center justify-center gap-1 text-gray-500">
          <LockKeyhole size={18} />{" "}
          <div className="">Secured workspace setup</div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
