
import {NextResponse} from 'next/server';
import { createClient } from "@/lib/supabase/server";



export async function POST(request: Request){
    const {name} = await request.json();
    const supabase = await createClient();

    if(!name || name.trim() === ""){
        return Response.json({ message: "Invalid business name" }, { status: 400 });
    }
    try{
        const {data, error} = await supabase.rpc('create_new_business', {business_name: name});
        if(error){
            throw error;
        }
        console.log("Business created:", data);
        return Response.json({ message: "Business created successfully", data }, { status: 200 });
    }catch(error){
        console.log("Error creating business:", error);
        return Response.json({ message: `Error creating business: ${error}` }, { status: 500 });
    }
    
   
}

// Explicitly reject GET requests
export async function GET() {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}