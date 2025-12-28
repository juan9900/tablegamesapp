import {TypedSupabaseClient} from '@/lib/supabase/types'
export function getorganizationsByUser(client: TypedSupabaseClient, userId: string){
    console.log({client});
    return client.from('organization_user').select(
          "organization_id, admin, organization_data:organizations(name, address)"
        ).eq('user_id', userId).throwOnError()
}