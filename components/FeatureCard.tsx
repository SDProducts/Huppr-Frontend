import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function FeatureCard({
  icon,
  title,
  description,
  footer,
  ...rest
}: {
  icon: React.ReactNode;
  description: React.ReactNode;
  title: React.ReactNode;
  footer?: React.ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <Card
      className={cn(
        "bg-light rounded-xl border border-gray-100 shadow-sm",
        rest.className,
      )}
      {...rest}
    >
      <CardContent className="grid gap-3">
        {icon}
        <strong className="flex items-center gap-2 text-sm ">{title}</strong>
        <p>{description}</p>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
