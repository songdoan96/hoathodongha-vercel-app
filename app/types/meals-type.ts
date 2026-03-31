export interface MealsType {
  id: string;
  ngay: Date | string;
  first: string;
  second: string;
  mealLines: MealsLineType[];
}
export interface MealsLineType {
  id: string;
  mealId: string;
  bophan: string;
  firstQty: number;
  secondQty: number;
}
