import mqtt from "mqtt";
import axios from "axios";

const client = mqtt.connect("ws://localhost:9001"); // ganti broker kamu

const SUPABASE_URL = "https://jxyzytlufxkomjjfbpux.supabase.co/rest/v1/Udang%20Vaname";
const API_KEY = "sb_publishable_xTJsOq-udkbXu5Ob12D3Xtw_0QtDTsdB";

client.on("connect", () => {
  console.log("Connected to MQTT");
  client.subscribe("tambak/sensor"); // topic kamu
});

client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    console.log("Data masuk:", data);

    await axios.post(
      SUPABASE_URL,
      {
        temp: data.temp,
        ph: data.ph,
        tds: data.tds,
        do_real: data.do_real,
        do_virtual: data.do_virtual,
        aerator: data.aerator,
      },
      {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Data masuk ke Supabase ✅");
  } catch (err) {
    console.error("Error:", err.message);
  }
});