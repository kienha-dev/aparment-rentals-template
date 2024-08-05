import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadFile = async (file: File) => {
  const [_, extension] = file.name.split(".");
  const { data, error } = await supabase.storage
    .from("medias")
    .upload(`apartments/images/${uuidv4()}.${extension}`, file);
  if (error) {
    throw error;
  }
  return data;
};

export { supabase };
