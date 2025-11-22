import { Box, Typography, Divider } from "@mui/material";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useTheme } from "../context/ThemeContext";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  { city: "New York", amount: "72K", coords: [-74.006, 40.7128] },
  { city: "San Francisco", amount: "39K", coords: [-122.4194, 37.7749] },
  { city: "Sydney", amount: "25K", coords: [151.2093, -33.8688] },
  { city: "Singapore", amount: "61K", coords: [103.8198, 1.3521] },
];

export default function RevenueLocationChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box
      className="
        col-span-12 xl:col-span-4 
        rounded-xl p-5 shadow-sm items-center text-center
      "
      style={{
        background: isDark ? "#FFFFFF0D" : "#FFFFFF",
        border: isDark ? "1px solid #3A3A3A" : "1px solid #E5E7EB",
        color: isDark ? "#E5E5E5" : "#1C1C1C",
      }}
    >
      {/* Heading */}
      <Typography
        sx={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
        className="font-semibold text-sm"
      >
        Revenue by Location
      </Typography>

      {/* Map */}
      <Box className="w-full h-[220px] mb-5 mt-4">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 95 }}
          width={400}
          height={220}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isDark ? "#2A2A2A" : "#E5E7EB",
                      stroke: isDark ? "#444" : "#D1D5DB",
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: isDark ? "#3A3A3A" : "#CBD5E1",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Markers */}
          {locations.map((loc, i) => (
            <Marker key={i} coordinates={loc.coords}>
              <circle
                r={5}
                fill={isDark ? "#60A5FA" : "#3B82F6"}
                stroke={isDark ? "#FFFFFF" : "#FFFFFF"}
                strokeWidth={1.5}
              />
            </Marker>
          ))}
        </ComposableMap>
      </Box>

      {/* Location List */}
      <Box component="ul" className="text-sm space-y-4 mt-3">
        {locations.map((item, index) => {
          const max = Math.max(...locations.map((l) => parseInt(l.amount)));
          const percent = (parseInt(item.amount) / max) * 100;

          return (
            <Box key={index} component="li">
              <Box
                className="flex justify-between items-center text-xs pb-1"
                style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
              >
                <span>{item.city}</span>
                <span>{item.amount}</span>
              </Box>

              {/* Progress bar */}
              <Box
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{
                  background: isDark ? "#2C2C2C" : "#E5EEF5",
                }}
              >
                <Box
                  className="h-full rounded-full"
                  sx={{
                    width: `${percent}%`,
                    backgroundColor: isDark ? "#6BA9CC" : "#A8C5DA",
                  }}
                />
              </Box>

              {index < locations.length - 1 && (
                <Divider
                  className="mt-3"
                  style={{
                    borderColor: isDark ? "#3A3A3A" : "#E5E7EB",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
