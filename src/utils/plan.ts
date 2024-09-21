interface PlanLimit {
  0: number;
  1: number;
  2: number;
}

export const planLimits: Record<string, PlanLimit> = {
  projects: { 0: 1, 1: 3, 2: 5 },
  members: { 0: 1, 1: 5, 2: 10 },
};

export function getLimit(tier: number, key: string): number {
  return planLimits[key][tier as 0 | 1 | 2] ?? 0;
}
