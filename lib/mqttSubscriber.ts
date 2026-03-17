import mqtt from "mqtt"
import pool  from "./db"

console.log("=== MQTT SUBSCRIBER FILE LOADED ===")
const globalForMqtt = global as any

if (!globalForMqtt.mqttClient) {
  const client = mqtt.connect("mqtt://localhost:1883")

  client.on("connect", () => {
    console.log("MQTT Backend Connected ✅")
    client.subscribe("tambak/sensor")
  })

  client.on("message", async (_, msg) => {
    try {
      const data = JSON.parse(msg.toString())

      console.log("DATA MASUK:", data)

      // Validasi & fallback agar tidak undefined
      const temperature = data.temperature ?? null
      const tds = data.tds ?? null
      const doReal = data.do_real ?? null
      const doVirtual = data.do_virtual ?? null
      const ph = data.ph ?? null
      const aerator = data.aerator ?? null

      await pool.execute(
        `INSERT INTO sensor_logs 
        (temperature, tds, do_real, do_virtual, ph, aerator) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [temperature, tds, doReal, doVirtual, ph, aerator]
      )

      console.log("Data saved to MySQL ✅")
    } catch (err) {
      console.error("DB Error:", err)
    }
  })

  globalForMqtt.mqttClient = client
}
