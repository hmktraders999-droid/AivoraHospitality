import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createClient } from "@supabase/supabase-js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  // API endpoint to handle contact form submission
  app.post("/api/submit", async (req, res) => {
    try {
      const { name, email, business_name, contact_number } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const { data, error } = await supabase
        .from("leads")
        .insert([{ name, email, business_name, contact_number }])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      res.json({ success: true, message: "Lead stored successfully", data });
    } catch (err: any) {
      console.error("Error storing lead:", err);
      res.status(500).json({ error: err.message || "Failed to store lead" });
    }
  });

  // API endpoint to get Vapi credentials securely
  app.get("/api/vapi-config", (req, res) => {
    const assistantId = process.env.VAPI_ASSISTANT_ID;
    const publicKey = process.env.VAPI_PUBLIC_KEY;

    if (!assistantId || !publicKey) {
      console.error("Vapi credentials not configured");
      return res.status(500).json({ 
        error: "Vapi configuration is missing. Please contact support." 
      });
    }

    res.json({
      assistantId,
      publicKey,
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
