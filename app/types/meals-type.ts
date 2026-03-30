export interface MealsType {
  id: string;
  ngay: Date | string;
  main: string;
  second: string;
  mealLines: MealsLineType[];
}
export interface MealsLineType {
  id: string;
  mealId: string;
  bophan: string;
  mainQty: number;
  secondQty: number;
}
