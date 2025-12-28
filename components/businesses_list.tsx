"use client";
import { useRouter } from "next/navigation";

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
import { useUser } from "./providers/UserProvider";

export default function BusinessesList() {
  const supabase = createClient();
  const router = useRouter();
  const user = useUser();
  const [organizations, setOrganizations] = useState<any[]>([]);

  const { data, isPending, error } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_user")
        .select("user_id, business_data:businesses(*)")
        .eq("user_id", user.user?.id);

      if (error) {
        console.error("Error fetching organizations:", error);
        return null;
      }

      console.log(data);
      return data;
    },
    enabled: !!user.user,
  });

  return (
    <div className={cn("flex flex-col gap-6 ")}>
      <Card className="p-4">
        <CardHeader className="pt-3">
          <CardTitle className="text-2xl">Negocios</CardTitle>
          <CardDescription>
            Escoge el negocio al que deseas ingresar
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[60vh] h-full overflow-y-auto gap-2 flex flex-col p-0">
          {data && !isPending ? (
            data.map((business: any) => (
              <OrganizationCard
                key={business.business_data.id}
                business={business.business_data}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-10">
              <Spinner className="size-8" />
            </div>
          )}
        </CardContent>
        <Button
          variant={"default"}
          onClick={() => router.push("/businesses/new")}
          className="text-sm w-full mt-2"
          disabled={isPending}
        >
          Crear nuevo negocio
        </Button>
      </Card>
    </div>
  );
}
