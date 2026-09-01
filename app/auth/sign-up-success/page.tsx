import RoleForm from "@/app/auth/sign-up-success/_components/RoleForm";

export default function Page() {
  return (
    <div className="">
      <div className="w-full space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Thank you for signing up!</h2>
          <p className="text-sm text-muted-foreground">
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in.
          </p>
        </div>
        <RoleForm />
      </div>
    </div>
  );
}
