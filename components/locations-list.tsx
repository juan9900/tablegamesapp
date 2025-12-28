"use client";
import { useParams, useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Router } from "next/router";
import OrganizationCard from "./organization_card";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./ui/spinner";
import { IBusiness } from "@/types";

export default function LocationsList() {
  const supabase = createClient();
  const router = useRouter();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const { businessId } = useParams();
  console.log(businessId);

  const { data, isPending, error } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("location_user")
        .select("*,  locations(*)")
        .eq("location_user.user_id", user.data.user?.id);

      if (error) {
        console.error("Error fetching organizations:", error);
        return null;
      }

      console.log(data);
      return data;
    },
  });

  return (
    <div className={cn("flex flex-col gap-6 ")}>
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-2xl">Ubicaciones</CardTitle>
          <CardDescription>
            Escoge la ubicación a la que deseas ingresar
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[60vh] h-full overflow-y-auto gap-2 flex flex-col p-0">
          {data ? (
            data.map((org) => (
              <OrganizationCard key={org.business_id} business={org} />
            ))
          ) : (
            <div className="flex items-center justify-center py-10">
              <Spinner className="size-8" />
            </div>
          )}
        </CardContent>
        <Button
          variant={"default"}
          onClick={() => router.push(`/businesses/${businessId}/locations/new`)}
          className="text-sm w-full mt-2"
          disabled={isPending}
        >
          Crear nueva ubicación
        </Button>
      </Card>
    </div>
  );
}
