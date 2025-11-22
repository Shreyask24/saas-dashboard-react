import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export default function RevenueChart({ currentWeek, previousWeek }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = MONTHS.map((month, i) => ({
    month,
    previous: previousWeek[i],
    currentSolid: i <= 3 ? currentWeek[i] : null,
    currentProjected: i >= 3 ? currentWeek[i] : null,
  }));

  const currentTotal = currentWeek.reduce((a, b) => a + b, 0);
  const previousTotal = previousWeek.reduce((a, b) => a + b, 0);

  return (
    <div className="w-full">
      <div
        className="flex items-center mb-8 text-[12px] leading-[18px]"
        style={{
          color: isDark ? "#E5E5E5" : "#1C1C1C",
        }}
      >
        <h3
          className="font-semibold text-[14px] leading-[18px] pr-4 mr-4"
          style={{
            borderRight: `1px solid ${isDark ? "#FFFFFF33" : "#1C1C1C33"}`,
            color: isDark ? "#FFFFFF" : "#1C1C1C",
          }}
        >
          Revenue
        </h3>

        <div className="flex items-center gap-2 mr-6">
          <span
            className="h-2 w-2 rounded-full inline-block"
            style={{ background: isDark ? "#FFFFFF" : "#000000" }}
          />
          <span style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}>
            Current Week
          </span>
          <span
            className="font-semibold"
            style={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
          >
            ${currentTotal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full inline-block"
            style={{ background: isDark ? "#93B4D8" : "#93B4D8" }}
          />
          <span style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}>
            Previous Week
          </span>
          <span
            className="font-semibold"
            style={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
          >
            ${previousTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="150%">
          <LineChart
            data={data}
            margin={{ top: 0, right: 8, bottom: 8, left: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#E5E7EB" strokeWidth={1} />

            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}M`)}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
            />

            <defs>
              <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93B4D8" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#93B4D8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="previous"
              stroke="#93B4D8"
              fill="url(#revArea)"
              strokeWidth={2}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="previous"
              stroke="#93B4D8"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="currentSolid"
              stroke="#000000"
              strokeWidth={2.2}
              dot={false}
              connectNulls={false}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="currentProjected"
              stroke="#000000"
              strokeWidth={2}
              strokeDasharray="4 6"
              dot={false}
              connectNulls={false}
              isAnimationActive={false}
            />

            <Tooltip
              cursor={false}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                fontSize: 12,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
