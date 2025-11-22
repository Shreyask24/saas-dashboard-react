import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import TopProducts from "./dashboard/TopProducts";
import { productRows } from "../utils/dashboardData";
import TotalSalesCard from "./TotalSalesCard";

const SalesChart = ({ search }) => {
  const filteredProducts = useMemo(() => {
    if (!search) return productRows;
    return productRows.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Box className="grid grid-cols-12 gap-6">
      {/* Top Products (large left panel) */}
      <Box className="col-span-12 xl:col-span-8">
        <TopProducts rows={filteredProducts} />
      </Box>

      <Box className="col-span-12 xl:col-span-4">
        <TotalSalesCard />
      </Box>
    </Box>
  );
};

export default SalesChart;
