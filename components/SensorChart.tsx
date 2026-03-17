'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

type Data = {
  gas: number;
  time: string;
};

export default function SensorChart({ data }: { data: Data[] }) {
  return (
    <div style={{ background: "#222", padding: 20, borderRadius: 10, marginTop: 16 }}>
      <h2>Grafik Sensor Gas</h2>
      <LineChart width={650} height={300} data={data}>
        <XAxis dataKey="time" />
        <YAxis domain={[0, 1000]} />
        <CartesianGrid stroke="#444" />
        <Tooltip />
        <Line type="monotone" dataKey="gas" stroke="#ff5722" />
      </LineChart>
    </div>
  );
}
