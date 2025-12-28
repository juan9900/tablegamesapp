import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const orgId = cookieStore.get("selected_org")?.value;
  console.log("Selected org ID:", orgId);
  if (!orgId) return <div>No organization selected</div>;

  const supabase = await supabaseServer();
  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", orgId)
    .single();

  if (!org) return <div>organization not found</div>;

  return (
    <div>
      Dashboard
      {JSON.stringify(org)}
    </div>
  );
}
