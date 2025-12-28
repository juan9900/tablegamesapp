import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const { data: userAccess } = await supabase
    .from("business_user")
    .select("admin")
    .eq("user_id", user.data.user?.id)
    .eq("business_id", organizationId)
    .single();

  console.log(userAccess);

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", organizationId)
    .single();

  if (!business) {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Establecimiento no encontrado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>El establecimiento que buscas no existe.</p>
            <Link href="/organizations" className="text-blue-500 underline">
              Volver a la lista de negocios
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-xl uppercase font-bold">{business.business_name}</h1>
      <p>{business.business_address}</p>
      {JSON.stringify(business)}
      <div className="flex flex-col gap-2 pt-5">
        {userAccess && userAccess.admin && (
          <>
            <Link
              className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
              href={`/organizations/${business.business_id}/settings`}
            >
              Administrar Establecimiento
            </Link>
            <Link
              className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
              href={`/organizations/${business.business_id}/settings`}
            >
              Administrar Moderadores
            </Link>
          </>
        )}
        <Link
          className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
          href={`/organizations/${business.organization_id}/games`}
        >
          Administrar Juegos
        </Link>
      </div>
    </div>
  );
}
