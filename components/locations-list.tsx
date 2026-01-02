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
import LocationCard from "./location-card";

export default function LocationsList() {
  const supabase = createClient();
  const router = useRouter();
  const { businessId } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return null;
      // const { data, error } = await supabase
      //   .from("location_user")
      //   .select("user_id, role, location_data:locations(*, businesses(id))")
      //   .eq("location_data.businesses.id", businessId)

      //   .eq("user_id", user.data.user?.id);
      const { data, error } = await supabase
        .from("business_user")
        .select("user_id, business_id, businesses(id, locations!inner(*))")
        .eq("user_id", user.data.user?.id)
        .eq("business_id", String(businessId))
        .single();

      if (error) {
        if (error.code !== "PGRST116") {
          console.error("Error fetching organizations:", error);
        }
        return null;
      }

      console.log(data);

      return data?.businesses;
    },
    enabled: !!businessId && !!supabase,
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
          {isPending ? (
            <div className="flex items-center justify-center py-10">
              <Spinner className="size-8" />
            </div>
          ) : data && data.locations && data.locations.length > 0 ? (
            data.locations.map((loc: any) => (
              <LocationCard key={loc.id} location={loc} />
            ))
          ) : (
            <div className="flex justify-center items-center py-5 text-center text-sm">
              <span>
                Parece que aún no tienes ubicaciones para este negocio... 😓
              </span>
            </div>
          )}
          {/* {data ? (
            
          ) : (
            
          )} */}
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
