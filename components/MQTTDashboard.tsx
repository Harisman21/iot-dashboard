
'use client';
import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

export default function MQTTDashboard() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const client = mqtt.connect('wss://a79904ae18df.ngrok-free.app/mqtt');

    client.on('connect', () => {
      client.subscribe('iot/sensor/gas');
    });

    client.on('message', (topic: string, message: Buffer) => {
      try {
        const data = JSON.parse(message.toString());
        setMessages(prev => [...prev, { topic, data }]);
      } catch {
        setMessages(prev => [...prev, { topic, data: message.toString() }]);
      }
    });

    // FUNGSI CLEANUP
    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h2>Live MQTT Data</h2>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}
