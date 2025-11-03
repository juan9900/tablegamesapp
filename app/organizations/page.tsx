import OrganizationsList from "@/components/organizations-list";
import { createClient } from "@/utils/supabase/server";

export default async function Instruments({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OrganizationsList />
      </div>
    </div>
  );
}
