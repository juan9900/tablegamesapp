"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ILocation } from "@/types";
import { Building2, FlagTriangleRight } from "lucide-react";
import { parseRole } from "@/utils/roles";

export default function LocationCard({ location }: { location: ILocation }) {
  const router = useRouter();
  return (
    // <>{JSON.stringify(location)}</>
    <Card
      onClick={() =>
        router.push(
          `/businesses/${location.business_id}/locations/${location.id}`
        )
      }
      className="flex flex-row items-center p-3 hover:bg-neutral-100 cursor-pointer"
    >
      <div className="w-12 h-12  rounded-md flex justify-center items-center">
        <FlagTriangleRight size={32} color="#ba1717" />
      </div>
      <div className=" flex flex-col items-start pl-3 justify-center">
        <CardTitle>{location.name}</CardTitle>
        <CardDescription>{location.address}</CardDescription>
        <CardDescription className="text-sm text-neutral-500">
          Tu rol: {parseRole(location.role)}
        </CardDescription>
      </div>
    </Card>
  );
}
