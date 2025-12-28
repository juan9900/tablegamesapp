import { Database } from "./supabase";
type DBBusiness = Database['public']['Tables']['businesses']['Row'];

export type IBusiness = {
  id: string;
  
name: string;


}