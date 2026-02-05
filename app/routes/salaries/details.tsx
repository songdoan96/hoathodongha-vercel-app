import React from "react";
import { useSalariesDetails } from "~/hooks/salaries-hook";
import useSalaryStore from "~/stores/salary-store";

function SalaryDetailsPage() {
  const month = "2026-02";
  const { cccd, msnv } = useSalaryStore();
  console.log(`🚀 ~ SalaryDetailsPage ~ {cccd,msnv}:`, { cccd, msnv });
  // if (!cccd || !msnv) {
  //   return null;
  // }
  const { data, isLoading } = useSalariesDetails({ month, msnv, cccd });
  console.log(`🚀 ~ SalaryDetailsPage ~ { data, isLoading }:`, {
    data,
    isLoading,
  });
  return <div>SalaryDetailsPage</div>;
}

export default SalaryDetailsPage;
