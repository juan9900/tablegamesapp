import DashboardWelcome from "@/components/dashboard/dashboard-welcome";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Link } from "lucide-react";
import { businessAndLocationOptions } from "@/queries/get-business-and-location";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ businessId: string; locationId: number }>;
}) {
  const { businessId, locationId } = await params;
  const queryClient = getQueryClient();
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  await queryClient.prefetchQuery(
    businessAndLocationOptions(supabase, businessId, locationId, user)
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardWelcome locationId={locationId} businessId={businessId} />
    </HydrationBoundary>
  );
}
