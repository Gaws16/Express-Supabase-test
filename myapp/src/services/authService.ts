import supabase from "../database/client/supabaseClient";

// Path: myapp/src/services/authService.ts

export const signUpNewUser = async function (email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    return error.message;
  }
  return data;
};

export const signInUser = async function (email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return error.message;
  }
  return data;
};
