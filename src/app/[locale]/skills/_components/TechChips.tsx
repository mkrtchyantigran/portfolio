'use client';

import { Chip } from '@heroui/react';
import { techChips } from '@/data/skills';

export function TechChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {techChips.map((chip) => (
        <Chip key={chip} variant="flat" color="primary" size="lg">
          {chip}
        </Chip>
      ))}
    </div>
  );
}
