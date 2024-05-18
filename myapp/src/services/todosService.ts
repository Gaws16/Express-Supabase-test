import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../database/client/supabaseClient";
import dotenv from "dotenv";
dotenv.config();

interface Todo {
  id: string;
  created_at: string;
  taskDueTo: string;
  taskName: string;
  taskDescription?: string;
  creatorId?: string;
}
export const getTodos = async function (): Promise<Todo[] | null> {
  const { data, error, status, statusText }: PostgrestSingleResponse<Todo[]> =
    await supabase.from("ToDos").select("*");
  if (error) {
    console.error("Error fetching todos", error.message);
    return null;
  }
  console.log("Todos", data);
  console.log("Status", status);
  console.log("Status Text", statusText);
  return data;
};
