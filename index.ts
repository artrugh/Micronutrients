import { MicronutrientCalculator } from "./services/MicronutrientsCalculator";

const DND = 2.5;
const days = 4;

const a = new MicronutrientCalculator("Zinc", DND, days);
const listOfbestDosificationOfZincsPills =
  a.listOfMicronutrientsByBestDosificationOfPills;
