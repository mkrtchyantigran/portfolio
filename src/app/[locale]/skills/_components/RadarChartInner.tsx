'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { skills } from '@/data/skills';

// Recharts is loaded client-only (see SkillsRadar) to avoid SSR issues
// with React 19 / Turbopack.
export function RadarChartInner({ label }: { label: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={skills} outerRadius="78%">
        <PolarGrid stroke="var(--chart-grid)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: 'var(--chart-axis)', fontSize: 12 }}
        />
        <Radar
          name={label}
          dataKey="level"
          stroke="#818cf8"
          fill="#818cf8"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
