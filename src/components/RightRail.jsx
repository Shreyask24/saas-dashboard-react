import React from "react";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import { activities, notifications, contacts } from "../utils/dashboardData";
import { useTheme } from "../context/ThemeContext";

export default function RightRail() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box
      component="aside"
      className="w-72 p-5 space-y-6"
      style={{
        background: isDark ? "#FFFFFF1A" : "#FFFFFF",
        color: isDark ? "#E5E5E5" : "#1C1C1C",
        borderLeft: isDark ? "1px solid #3A3A3A" : "1px solid #E5E7EB",
      }}
    >
      {/* NOTIFICATIONS */}
      <Box>
        <Typography
          className="font-semibold text-sm tracking-tight"
          sx={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
        >
          Notifications
        </Typography>

        <Box className="mt-3 space-y-4">
          {notifications.map((n) => (
            <Box key={n.id} className="flex items-start gap-3">
              <Avatar
                className="h-4 w-4 text-[16px]"
                style={{
                  background: isDark ? "#2D3A5C" : "#E0E7FF",
                  color: isDark ? "#AFC7FF" : "#3730A3",
                }}
                variant="circular"
              >
                {n.icon}
              </Avatar>

              <Box>
                <Typography
                  className="text-sm leading-tight"
                  sx={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
                >
                  {n.text}
                </Typography>

                <Typography
                  className="text-xs mt-0.5"
                  sx={{ color: isDark ? "#9CA3AF" : "#6B7280" }}
                >
                  {n.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider style={{ borderColor: isDark ? "#3A3A3A" : "#E5E7EB" }} />

      {/* ACTIVITIES */}
      <Box className="mt-6">
        <Typography
          className="font-semibold text-sm tracking-tight"
          sx={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
        >
          Activities
        </Typography>

        <Box className="mt-3 space-y-4">
          {activities.map((a) => (
            <Box key={a.id} className="flex items-start gap-3">
              <Avatar src={a.avatar} className="h-4 w-4 rounded-full" />

              <Box>
                <Typography
                  className="text-sm leading-tight"
                  sx={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
                >
                  {a.text}
                </Typography>

                <Typography
                  className="text-xs mt-0.5"
                  sx={{ color: isDark ? "#9CA3AF" : "#6B7280" }}
                >
                  {a.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider style={{ borderColor: isDark ? "#3A3A3A" : "#E5E7EB" }} />

      {/* CONTACTS */}
      <Box className="mt-6">
        <Typography
          className="font-semibold text-sm tracking-tight"
          sx={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
        >
          Contacts
        </Typography>

        <Box className="mt-3 space-y-3 text-sm">
          {contacts.map((c) => (
            <Box key={c.id} className="flex items-center justify-between">
              <Box className="flex items-center gap-2">
                <Avatar src={c.avatar} className="h-4 w-4 rounded-full" />
                <Typography
                  className="text-sm"
                  sx={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
                >
                  {c.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
