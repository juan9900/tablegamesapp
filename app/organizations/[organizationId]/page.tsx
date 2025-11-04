import { Button } from "@/components/ui/button";
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
    .from("organization_user")
    .select("admin")
    .eq("user_id", user.data.user?.id)
    .eq("organization_id", organizationId)
    .single();

  console.log(userAccess);

  const { data: organization } = await supabase
    .from("organizations")
    .select("*")
    .eq("organization_id", organizationId)
    .single();

  return (
    <div className="p-4">
      <h1 className="text-xl uppercase font-bold">
        {organization.organization_name}
      </h1>
      <p>{organization.organization_address}</p>

      <div className="flex flex-col gap-2 pt-5">
        {userAccess && userAccess.admin && (
          <>
            <Link
              className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
              href={`/organizations/${organization.organization_id}/settings`}
            >
              Administrar Establecimiento
            </Link>
            <Link
              className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
              href={`/organizations/${organization.organization_id}/settings`}
            >
              Administrar Moderadores
            </Link>
          </>
        )}
        <Link
          className="border border-neutral-200 rounded-md w-full p-2 text-sm text-center font-medium"
          href={`/organizations/${organization.organization_id}/settings`}
        >
          Administrar Juegos
        </Link>
      </div>
    </div>
  );
}
