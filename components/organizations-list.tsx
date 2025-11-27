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

export default function OrganizationsList() {
  const supabase = createClient();
  const router = useRouter();
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const user = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("organization_user ")
        .select(
          "organization_id, admin, organization_data:organizations(organization_name, organization_address)"
        )
        .eq("user_id", user.data.user?.id);

      setOrganizations(data || []);
      if (error) {
        console.error("Error fetching organizations:", error);
      } else {
        console.log("Organizations data:", data);
      }
    };

    fetchOrganizations();
  }, []);
  return (
    <div className={cn("flex flex-col gap-6 ")}>
      <Card className="p-3">
        <CardHeader>
          <CardTitle className="text-2xl">Establecimientos</CardTitle>
          <CardDescription>
            Escoge el establecimiento al que deseas ingresar
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-y-auto gap-2 flex flex-col">
          {organizations.map((org) => (
            <OrganizationCard key={org.organization_id} organization={org} />
          ))}
        </CardContent>
        <Button
          variant={"outline"}
          onClick={() => router.push("/organizations/new")}
          className="text-sm w-full"
        >
          Crear nuevo establecimiento
        </Button>
      </Card>
    </div>
  );
}
