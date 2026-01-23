import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Example input (replace with real data)
const progressData = [
  { date: '2025-06-25', completed: 2 },
  { date: '2025-06-26', completed: 1 },
  { date: '2025-06-27', completed: 3 },
];

export default function ProgressGraph() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={progressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
