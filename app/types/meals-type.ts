export interface MealsType {
  id: string;
  ngay: Date | string;
  first: string;
  second: string;
  isSpecial?: boolean;
  mealLines: MealsLineType[];
}
export interface MealsLineType {
  id: string;
  mealId: string;
  bophan: string;
  firstQty: number;
  secondQty: number;
}
