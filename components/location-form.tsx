"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { set } from "zod";

export function LocationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { businessId } = useParams();

  const queryClient = new QueryClient();

  const createMutation = useMutation({
    mutationFn: async (organizationName: string) => {
      try {
        const response = await fetch("/api/locations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            business_id: businessId,
            new_location_name: locationName,
            new_location_address: locationAddress,
          }),
        });

        if (!response.ok) {
          throw new Error("Error creating business");
        }

        const data = await response.json();
        console.log("Business created:", data);
      } catch (error) {
        console.log("Error creating business:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      router.push("./");
    },
  });

  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    await createMutation.mutate(locationName);
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nueva ubicación</CardTitle>
          <CardDescription>Crea una nueva ubicación</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateLocation}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Nombre de la ubicación</Label>
                <Input
                  id="organization_name"
                  type="text"
                  placeholder="Mi ubicación"
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Dirección de la ubicación</Label>
                <Input
                  id="user_lastname"
                  type="text"
                  placeholder="Dirección"
                  required
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creando ubicación..." : "Crear ubicación"}
              </Button>
              <Button
                onClick={() => {
                  router.push("./");
                }}
                type="button"
                variant={"outline"}
                className="w-full"
                disabled={isLoading}
              >
                Volver a las ubicaciónes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
