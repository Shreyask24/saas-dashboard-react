import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

const data = [
  { name: "Jan", actual: 15, projected: 5 },
  { name: "Feb", actual: 18, projected: 8 },
  { name: "Mar", actual: 17, projected: 5 },
  { name: "Apr", actual: 20, projected: 10 },
  { name: "May", actual: 13, projected: 6 },
  { name: "Jun", actual: 18, projected: 7 },
];

const ProjectionChart = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box
      className="rounded-lg p-4 min-w-[432px] shadow-sm"
      style={{
        background: isDark ? "#FFFFFF0D" : "#F7F9FB",
        color: isDark ? "#E5E5E5" : "#1C1C1C",
      }}
    >
      <Typography
        sx={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
        className="font-semibold text-sm"
      >
        Projections vs Actuals
      </Typography>

      <ResponsiveContainer className="mt-4" width="100%" height={200}>
        <BarChart data={data} barSize={18} barCategoryGap="35%">
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={isDark ? "#3A3A3A" : "#E5E7EB"}
          />

          <XAxis
            dataKey="name"
            tick={{
              fill: isDark ? "#CCCCCC" : "#848484",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: isDark ? "#BFBFBF" : "#A1A1A1",
              fontSize: 12,
            }}
            tickFormatter={(v) => `${v}M`}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: isDark ? "#1A1A1A" : "#FFFFFF",
              border: isDark ? "1px solid #333" : "1px solid #E5E5E5",
              borderRadius: "6px",
              color: isDark ? "#E5E5E5" : "#1C1C1C",
            }}
            cursor={{
              fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            }}
          />

          {/* Actual bar */}
          <Bar
            dataKey="actual"
            stackId="total"
            fill={isDark ? "#99B7E2" : "#99B7E2"}
            radius={[4, 4, 0, 0]}
          />

          {/* Projected bar */}
          <Bar
            dataKey="projected"
            stackId="total"
            fill={isDark ? "#D8E6F680" : "#D8E6F6"}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProjectionChart;
