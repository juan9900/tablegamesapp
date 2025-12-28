"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IBusiness } from "@/types";
import { Building2 } from "lucide-react";

export default function organizationCard({
  business,
}: {
  business: IBusiness;
}) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/businesses/${business.id}/locations`)}
      className="flex flex-row items-center pl-5 hover:bg-neutral-100 cursor-pointer"
    >
      <div className="w-12 h-12  rounded-md flex justify-center items-center">
        <Building2 size={32} color="#267a25" />
      </div>
      <CardHeader>
        <CardTitle>{business.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
