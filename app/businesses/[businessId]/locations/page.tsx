import LocationsList from "@/components/locations-list";

export default function LocationsPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LocationsList />
      </div>
    </div>
  );
}
