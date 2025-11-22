import { Box, IconButton, InputBase, Typography } from "@mui/material";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import {
  DarkMode,
  LightMode,
  ManageHistory,
  NotificationsNone,
  StarBorder,
} from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function PageHeader({
  title,
  breadcrumb,
  setSidebarCollapsed,
  setRightRailCollapsed,
}) {
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Box
      className={`
        flex items-center justify-between p-4 w-full border-b
        ${
          isDark
            ? "bg-[#FFFFFF1A] border-zinc-800"
            : "bg-white border-[#1C1C1C1A]"
        }
      `}
      sx={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
    >
      {/* LEFT SIDE */}
      <Box className="flex items-center gap-4">
        <Box>
          <IconButton onClick={() => setSidebarCollapsed((s) => !s)}>
            <ViewSidebarIcon
              style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
            />
          </IconButton>

          <IconButton className="p-2 rounded">
            <StarBorder style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }} />
          </IconButton>
        </Box>

        <Typography
          sx={{ color: isDark ? "#CCCCCC" : "#1C1C1C66" }}
          className="text-sm"
        >
          {breadcrumb} /{" "}
          <span style={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}>{title}</span>
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box className="flex items-center justify-center text-center gap-3">
        {/* SEARCH */}
        <Box className="relative">
          <InputBase
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            sx={{
              pl: 2,
              pr: 2,
              width: 180,
              borderRadius: "8px",
              fontSize: "14px",
              height: "36px",
              border: isDark ? "1px solid #3A3A3A" : "1px solid #E5E5E5",
              background: isDark ? "#1A1A1A" : "#F7F7F7",
              color: isDark ? "#E5E5E5" : "#1C1C1C",
            }}
          />
        </Box>

        {/* THEME TOGGLE */}
        <IconButton onClick={toggleTheme}>
          {isDark ? (
            <LightMode style={{ color: "#FFFFFF" }} />
          ) : (
            <DarkMode style={{ color: "#1C1C1C" }} />
          )}
        </IconButton>

        {/* HISTORY */}
        <IconButton className="h-9 w-9 rounded-full flex items-center justify-center">
          <ManageHistory style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }} />
        </IconButton>

        {/* NOTIFICATIONS */}
        <Box className="h-9 w-9 rounded-full flex items-center justify-center cursor-pointer">
          <NotificationsNone
            style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
          />
        </Box>

        {/* RIGHT RAIL TOGGLE */}
        <Box
          onClick={() => setRightRailCollapsed((prev) => !prev)}
          className="h-9 w-9 rounded-full flex items-center justify-center cursor-pointer"
        >
          <ViewSidebarIcon style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }} />
        </Box>
      </Box>
    </Box>
  );
}
