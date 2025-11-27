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

export function OrganizationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationAddress, setOrganizationAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setError("User not authenticated");
      setIsLoading(false);
      return;
    }
    try {
      const { error: organizationError, data: organizationData } =
        await supabase
          .from("organizations")
          .insert({
            organization_name: organizationName,
            organization_address: organizationAddress,
            owner_id: user.data.user.id,
          })
          .select()
          .single();
      if (organizationError) {
        console.log(JSON.stringify(organizationError));
        throw organizationError;
      }

      const { error: relationError } = await supabase
        .from("organization_user")
        .insert({
          organization_id: organizationData.organization_id,
          user_id: user.data.user.id,
          admin: true,
        });
      if (relationError) {
        console.log(JSON.stringify(relationError));
        throw relationError;
      }

      router.push("/organizations");
    } catch (error: unknown) {
      setError(
        error instanceof Error ? JSON.stringify(error) : "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nuevo establecimiento</CardTitle>
          <CardDescription>Crea un nuevo establecimiento</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrganization}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Nombre del establecimiento</Label>
                <Input
                  id="organization_name"
                  type="text"
                  placeholder="Mi empresa"
                  required
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Dirección de la sede</Label>
                <Input
                  id="user_lastname"
                  type="text"
                  placeholder="Doe"
                  required
                  value={organizationAddress}
                  onChange={(e) => setOrganizationAddress(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creando sede..." : "Crear sede"}
              </Button>
              <Button
                onClick={() => {
                  router.push("/organizations");
                }}
                type="button"
                variant={"outline"}
                className="w-full"
                disabled={isLoading}
              >
                Volver a establecimientos
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
