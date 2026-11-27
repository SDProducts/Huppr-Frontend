import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ResourceCard({
  featured_image = "",
  title,
  type,
  description,
  published_date,
  read_time,
  ...rest
}: {
  featured_image?: string;
  description: React.ReactNode;
  title: string;
  type: string;
  published_date: Date | string;
  read_time: string;
} & React.ComponentProps<"div">) {
  return (
    <Card
      className={cn(
        "bg-light rounded-xl border border-gray-100 shadow-sm overflow-clip",
        rest.className,
      )}
      {...rest}
    >
      <CardContent className="grid gap-3">
        <Image
          src={featured_image}
          alt={title}
          loading="lazy"
          className="bg-light rounded-[1.5rem] h-[15rem] object-cover"
        />
        <Badge>{type}</Badge>
        <strong className="flex items-center gap-2 text-sm ">{title}</strong>
        <p>{description}</p>
        {/*<small>{new Intl.DateTimeFormat("en").format(published_date)}</small>*/}
      </CardContent>
    </Card>
  );
}
