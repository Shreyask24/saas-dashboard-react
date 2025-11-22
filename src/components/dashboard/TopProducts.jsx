import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";

export default function TopProducts({ rows }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <TableContainer
      component={Paper}
      className="rounded-lg shadow-sm overflow-hidden"
      style={{
        background: isDark ? "#FFFFFF0D" : "#F7F9FB",
        color: isDark ? "#E5E5E5" : "#1C1C1C",
        border: isDark ? "1px solid #3A3A3A" : "1px solid #E5E7EB",
      }}
    >
      {/* Header */}
      <div
        className="p-4 border-b"
        style={{
          borderColor: isDark ? "#3A3A3A" : "#E5E7EB",
          color: isDark ? "#FFFFFF" : "#1C1C1C",
        }}
      >
        <h3 className="font-semibold text-sm">Top Selling Products</h3>
      </div>

      <Table>
        {/* TABLE HEAD */}
        <TableHead>
          <TableRow>
            {["Name", "Price", "Quantity", "Amount"].map((head, i) => (
              <TableCell
                key={i}
                className="font-normal text-[12px]! leading-[18px] p-3 first:text-left last:text-right"
                style={{
                  background: "transparent",
                  color: isDark ? "#CCCCCC" : "#1C1C1C66",
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {rows.map((r, idx) => (
            <TableRow
              key={idx}
              className="transition-colors"
              style={{
                background: "transparent",
                color: isDark ? "#E5E5E5" : "#1C1C1C",
              }}
              hover
            >
              <TableCell
                className="p-3 text-[12px] leading-[18px] font-normal"
                style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
              >
                {r.name}
              </TableCell>

              <TableCell
                className="p-3 text-[12px] leading-[18px] font-normal"
                style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
              >
                {r.price}
              </TableCell>

              <TableCell
                className="p-3 text-[12px] leading-[18px] font-normal"
                style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
              >
                {r.qty}
              </TableCell>

              <TableCell
                className="p-3 text-right text-[12px] leading-[18px] font-normal"
                style={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
              >
                {r.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
