
import {NextResponse} from 'next/server';
import { createClient } from "@/lib/supabase/server";



export async function POST(request: Request){
    const {new_location_name, new_location_address, business_id} = await request.json();
    const supabase = await createClient();

    if(!new_location_name || new_location_name.trim() === ""){
        return Response.json({ message: "Invalid location name" }, { status: 400 });
    }

    if(!new_location_address || new_location_address.trim() === ""){
        return Response.json({ message: "Invalid location name" }, { status: 400 });
    }

    if(!business_id || business_id.trim() === ""){
        return Response.json({ message: "Invalid business id" }, { status: 400 });
    }

    try{
        const {data, error} = await supabase.rpc('create_new_location', {business_id, new_location_name, new_location_address});
        if(error){
            throw error;
        }
        console.log("location created:", data);
        return Response.json({ message: "location created successfully", data }, { status: 200 });
    }catch(error){
        console.log("Error creating location:", error);
        return Response.json({ message: `Error creating location: ${error}` }, { status: 500 });
    }
    
   
}

// Explicitly reject GET requests
export async function GET() {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}