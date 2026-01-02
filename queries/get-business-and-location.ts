import { SupabaseClient, UserResponse } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";

type Business = {
  id: string;
  name: string;
  location_data: {
    id: number;
    name: string;
    address: string;
  }[];
};

type QueryResult = {
  user_id: string;
  business_data: Business; // Explicitly type as a single object
};

export function businessAndLocationOptions(
  supabase: SupabaseClient,
  businessId: string,
  locationId: number,
  user: UserResponse
) {
  return queryOptions({
    queryKey: ["business", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_user")
        .select("user_id, business_data:businesses(*, location_data:locations(*)) ")
        .eq("user_id", user.data.user?.id)
        .eq("business_id", businessId)
        .eq("business_data.location_data.id", locationId)
        .single<QueryResult>(); // Use the type here

      if (error || !data?.business_data) {
        console.error("Error fetching business:", error);
        return null;
      }

      console.log({ data });

      // Now TypeScript knows business_data is an object
      return data.business_data;
    },
    enabled: !!businessId && !!supabase && !!user,
  });
} 