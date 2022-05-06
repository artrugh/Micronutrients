export interface Micronutrient {
  name: string;
  amountPill: number;
  unit: Unit;
  absorption: number;
}

enum Unit {
  mg,
  Ui,
}

export interface AmountOfPillsAndDays {
  name: string;
  amountPills: number;
  days: number;
}
