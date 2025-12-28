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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { set } from "zod";

export function BusinessForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [organizationName, setorganizationName] = useState("");
  const [organizationAddress, setorganizationAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = new QueryClient();

  const createMutation = useMutation({
    mutationFn: async (organizationName: string) => {
      try {
        const response = await fetch("/api/businesses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: organizationName,
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
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      router.push("/businesses");
    },
  });

  const handleCreateorganization = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    await createMutation.mutate(organizationName);
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nuevo negocio</CardTitle>
          <CardDescription>Crea un nuevo negocio</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateorganization}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Nombre del negocio</Label>
                <Input
                  id="organization_name"
                  type="text"
                  placeholder="Mi empresa"
                  required
                  value={organizationName}
                  onChange={(e) => setorganizationName(e.target.value)}
                />
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="email">Dirección de la sede</Label>
                <Input
                  id="user_lastname"
                  type="text"
                  placeholder="Doe"
                  required
                  value={organizationAddress}
                  onChange={(e) => setorganizationAddress(e.target.value)}
                />
              </div> */}

              {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creando negocio..." : "Crear negocio"}
              </Button>
              <Button
                onClick={() => {
                  router.push("/businesses");
                }}
                type="button"
                variant={"outline"}
                className="w-full"
                disabled={isLoading}
              >
                Volver a los negocios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
