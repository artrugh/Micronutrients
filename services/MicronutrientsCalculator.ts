import { AmountOfPillsAndDays, Micronutrient } from "../types/types";
import json from "../assets/micronutrients.json";

export class MicronutrientCalculator {
  private readonly micronutrients: Micronutrient[] = JSON.parse(
    JSON.stringify(json)
  );
  constructor(
    private readonly micronutrientName: string,
    private readonly DND: number,
    private readonly days: number
  ) {}

  private calculateAbsorptionInUnit = (
    micronutrient: Micronutrient
  ): number => {
    const absorption = parseFloat(
      (micronutrient.amountPill * micronutrient.absorption * 0.01).toFixed(2)
    );
    return absorption;
  };

  private getMicronutrientsByName = (name: string): Micronutrient[] => {
    const filteredMicronutrients = this.micronutrients.filter((m) =>
      m.name.toLowerCase().includes(name.toLowerCase())
    );
    return filteredMicronutrients;
  };

  private calculateAmountOfPillsAndDays = (
    micronutrient: Micronutrient
  ): AmountOfPillsAndDays => {
    let amountOfPillsAndDays = {
      amountPills: 0,
      days: 0,
      name: micronutrient.name,
    };

    const totalAmountDND = this.DND * this.days;

    do {
      amountOfPillsAndDays.amountPills =
        amountOfPillsAndDays.amountPills +
        this.calculateAbsorptionInUnit(micronutrient);
      amountOfPillsAndDays.days = ++amountOfPillsAndDays.days;
    } while (amountOfPillsAndDays.amountPills < totalAmountDND);

    return amountOfPillsAndDays;
  };

  private get sortedMicronutrientsByBestDosificationOfPills(): AmountOfPillsAndDays[] {
    const totalAmountDND = this.DND * this.days;
    const arrayAmountOfPillsAndDays = this.getMicronutrientsByName(
      this.micronutrientName
    )
      .map((m) => this.calculateAmountOfPillsAndDays(m))
      .sort(
        (a, b) =>
          (a.amountPills % totalAmountDND) - (b.amountPills % totalAmountDND)
      );

    return arrayAmountOfPillsAndDays;
  }

  public get listOfMicronutrientsByBestDosificationOfPills(): Micronutrient[] {
    const micronutrientsNames: string[] =
      this.sortedMicronutrientsByBestDosificationOfPills.map((m) => m.name);

    const listOfBestDosificationOfPills = micronutrientsNames
      .map((name) => this.getMicronutrientsByName(name))
      .flat();

    return listOfBestDosificationOfPills;
  }
}
