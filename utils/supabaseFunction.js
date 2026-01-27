import { supabase } from "../utils/supabase";

export const getAllStudies = async() => {
  const studies = await supabase.from("study-record").select("*");
  return studies;
};