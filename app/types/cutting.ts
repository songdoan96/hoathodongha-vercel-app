export interface CuttingTableType {
  id: string;
  customer: string;
  style: string;
  type: string;
  itemCode?: string;
  batch: string;
  color: string;
  isMeter: boolean;
  isShirt: boolean;
  rate: number;
  isFinished: boolean;
  sizes: CuttingTableSizesType[];
}
interface CuttingTableSizesType {
  size: string;
  qty: number;
}
export interface CuttingTableTypeDate {
  id: string;
  customer: string;
  style: string;
  type: string;
  itemCode?: string;
  batch: string;
  color: string;
  isMeter: boolean;
  isShirt: boolean;
  rate: number;
  isFinished: boolean;
}
