"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { businessAndLocationOptions } from "@/queries/get-business-and-location";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "../providers/UserProvider";

// {"user_id":"83bb7e37-53b5-462c-8587-f11ed582d3c9","business_data":{"id":"add9e4c6-1f72-4d35-9efb-cea10c6d82db","name":"mi empresa","created_at":"2025-12-28T13:22:43.770762+00:00","location_data":[{"id":12,"name":"prueba","address":"nueva direccion","business_id":"add9e4c6-1f72-4d35-9efb-cea10c6d82db"}]}}

export default function DashboardWelcome({
  businessId,
  locationId,
}: {
  businessId: string;
  locationId: number;
}) {
  const supabase = createClient();
  const user = useUser();
  console.log(user);
  console.log({ locationId });

  const { data } = useQuery(
    businessAndLocationOptions(supabase, businessId, locationId, user.user?.id)
  );

  if (!data) {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Establecimiento no encontrado</CardTitle>
          </CardHeader>
          <CardContent>
            {JSON.stringify({ data })}

            <p>El establecimiento que buscas no existe.</p>
            {/* <Link href="/organizations" className="text-blue-500 underline">
              Volver a la lista de negocios
            </Link> */}
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-xl uppercase font-bold">{data.name}</h1>
      <p>Negocio: {data.location_data[0].name}</p>
      <div className="flex flex-col gap-2 pt-5">
        <Link
          className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
          href={`/organizations/${data.id}/settings`}
        >
          Administrar Establecimiento
        </Link>
        <Link
          className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
          href={`/organizations/${data.id}/settings`}
        >
          Administrar Moderadores
        </Link>

        <Link
          className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
          href={`/organizations/${data.id}/games`}
        >
          Administrar Juegos
        </Link>
      </div>
    </div>
  );
}
