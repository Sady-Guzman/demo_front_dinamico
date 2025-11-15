/*
  import { createClient } from '@supabase/supabase-js'
  
  const supabaseUrl = 'https://cpmygciraogszswfzsiq.supabase.co'
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
*/

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://cpmygciraogszswfzsiq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbXlnY2lyYW9nc3pzd2Z6c2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjU3ODQsImV4cCI6MjA3ODgwMTc4NH0.Nr2sCPc6-pLUJTJFputQMRy2CFvx0EicYbBvtpjNvaQ";

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadPersons() {
    const { data, error } = await supabase
        .from("personas")
        .select("*")
        .eq("cec", true);

    if (error) {
        console.error("Error al obtener personas:", error);
        return;
    }

    const container = document.getElementById("person-list");
    container.innerHTML = "";

    data.forEach(person => {
        const block = document.createElement("div");
        block.innerHTML = `
            <h1>${person.cargo}</h1>
            <h2>${person.nombre} ${person.apellido}</h2>
            <h3>${person.mail}</h3>
            <hr>
        `;
        container.appendChild(block);
    });
}

loadPersons();
