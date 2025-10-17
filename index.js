import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve your landing page (index.html)

// ✅ Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// ✅ API route to handle form submission
app.post("/api/submit", async (req, res) => {
  try {
    const { name, email, business_name, contact_number } = req.body;

    if (!name || !email)
      return res.status(400).json({ error: "Name and email are required" });

    const { data, error } = await supabase
      .from("Leads")
      .insert([{ name, email, business_name, contact_number }]);

    if (error) throw error;

    res.json({ success: true, message: "Lead stored successfully", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
