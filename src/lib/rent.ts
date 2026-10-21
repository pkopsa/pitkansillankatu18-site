import { RENT } from "@/config/site";
export type PackageId = keyof typeof RENT.packages;
const IDS: PackageId[] = ["eh1", "eh2", "eh3"];
export function calculateRentEstimate(team: number, months: number) {
  if (!Number.isInteger(team) || !Number.isInteger(months) || team < 1 || months < 1) return null;
  const id = IDS.find(id => {
    const p = RENT.packages[id];
    return team >= p.persons[0] && team <= p.persons[1] && months >= p.months[0] && months <= p.months[1];
  });
  if (!id) return null;
  const monthly = RENT.packages[id].monthly;
  const total = monthly * months;
  const vat = Math.round(total * RENT.vat * 100) / 100;
  const coworking = RENT.coworkingDeskMonthly * team * months;
  return { id, monthly, total, vat, gross: total + vat, perPerson: monthly / team, coworking, difference: coworking - total };
}
