import { supabase } from "../utils/supabase";

export const getAllStudies = async() => {
  const studies = await supabase.from("study-record").select("*");
  return studies;
};

// export const addStudies = async(title,time) => {
//   await supabase.from("study-record").insert({title:title, time:time});
// }

// utils/supabaseFunction.js
export const addStudies = async (title, time) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert([{ title, time }])
    .select()
    .single();

  if (error) throw error;
  return data;
};


export const deleteStudies = async (id) => {
     await supabase.from("study-record").delete().eq("id",id);
}
