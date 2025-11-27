"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Organization {
  organization_id: number;
  organization_data: {
    organization_name: string;
    organization_address: string;
  };
  admin: boolean;
}
export default function OrganizationCard({
  organization,
}: {
  organization: Organization;
}) {
  const router = useRouter();
  return (
    <Card
      onClick={() =>
        router.push(`/organizations/${organization.organization_id}`)
      }
      className="flex flex-row items-center pl-5 hover:bg-neutral-100 cursor-pointer"
    >
      <div className="w-10 h-10 bg-red-600 rounded-md"></div>
      <CardHeader>
        <CardTitle>
          {organization.organization_data.organization_name}
        </CardTitle>
        <CardDescription>
          {organization.organization_data.organization_address}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
