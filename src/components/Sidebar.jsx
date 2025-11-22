import React, { useState } from "react";

import Dashboard from "@mui/icons-material/Dashboard";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Folder from "@mui/icons-material/Folder";
import School from "@mui/icons-material/School";
import Description from "@mui/icons-material/Description";
import Business from "@mui/icons-material/Business";
import Article from "@mui/icons-material/Article";
import Chat from "@mui/icons-material/Chat";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Settings from "@mui/icons-material/Settings";
import { FiberManualRecord, Inventory } from "@mui/icons-material";

import { Box, Typography, Collapse, Avatar } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

function Sidebar({ collapsed, setActivePage, setRightRailCollapsed }) {
  const [openProfile, setOpenProfile] = useState(false);
  const { theme } = useTheme();

  return (
    <Box
      component="aside"
      className={`
        min-h-auto flex flex-col border-r transition-all duration-200 overflow-hidden
        ${collapsed ? "w-20" : "w-64"}
        ${
          theme === "dark"
            ? "bg-[#FFFFFF1A] border-zinc-800 text-gray-200"
            : "bg-white border-gray-100 text-gray-800"
        }
      `}
    >
      {/* BRAND */}
      <Box className="px-5 py-4 flex items-center gap-3">
        <Avatar
          className={`text-sm font-semibold ${
            theme === "dark" ? "bg-white/20 text-white" : "bg-black text-white"
          }`}
        >
          B
        </Avatar>

        {!collapsed && (
          <Typography color="inherit" className="text-[14px] font-semibold">
            ByeWind
          </Typography>
        )}
      </Box>

      {/* FAVORITES / RECENT */}
      {!collapsed && (
        <Box className="flex">
          <Box className="px-6 mt-2 mb-1">
            <Typography
              color="inherit"
              className="text-[11px] uppercase tracking-wide font-medium"
            >
              Favorites
            </Typography>
          </Box>

          <Box className="mt-2 mb-1">
            <Typography
              color="inherit"
              className="text-[11px] uppercase tracking-wide font-medium"
            >
              Recently
            </Typography>
          </Box>
        </Box>
      )}

      {/* FAVORITES LIST */}
      <Box
        className={`
          px-1 text-sm space-y-1
          ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
        `}
      >
        {["Overview", "Projects"].map((label, i) => (
          <Box
            key={i}
            className={`
              sidebar-item flex items-center gap-3 mx-2 px-3 py-2 cursor-pointer rounded-lg
              transition-all duration-150 text-[14px]
              ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"}
            `}
          >
            {React.cloneElement(<FiberManualRecord fontSize="small" />, {
              style: { color: theme === "dark" ? "#E5E5E5" : "#1C1C1C" },
            })}

            {!collapsed && (
              <Typography
                sx={{ color: theme === "dark" ? "#F5F5F5" : "#1C1C1C" }}
              >
                {label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {!collapsed && (
        <Box className="px-6 mt-4 mb-1">
          <Typography
            color="inherit"
            className="text-[11px] uppercase tracking-wide font-medium"
          >
            Dashboards
          </Typography>
        </Box>
      )}

      <Box
        className={`
          px-1 text-sm space-y-1
          ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
        `}
      >
        {[
          {
            icon: <Dashboard fontSize="small" />,
            label: "Default",
            page: "dashboard",
          },
          {
            icon: <Inventory fontSize="small" />,
            label: "Orders",
            page: "orders",
          },
          {
            icon: <ShoppingCart fontSize="small" />,
            label: "eCommerce",
            page: "ecommerce",
          },
          {
            icon: <Folder fontSize="small" />,
            label: "Projects",
            page: "projects",
          },
          {
            icon: <School fontSize="small" />,
            label: "Online Courses",
            page: "courses",
          },
        ].map((item, i) => (
          <Box
            key={i}
            onClick={() => setActivePage(item.page)}
            className={`
              sidebar-item flex items-center gap-3 mx-2 px-3 py-2 cursor-pointer rounded-lg
              transition-all duration-150
              ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"}
            `}
          >
            {React.cloneElement(item.icon, {
              style: { color: theme === "dark" ? "#E5E5E5" : "#1C1C1C" },
            })}

            {!collapsed && (
              <Typography
                sx={{ color: theme === "dark" ? "#F5F5F5" : "#1C1C1C" }}
              >
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* PAGES TITLE */}
      {!collapsed && (
        <Box className="px-6 mt-4 mb-1">
          <Typography
            color="inherit"
            className="text-[11px] uppercase tracking-wide font-medium"
          >
            Pages
          </Typography>
        </Box>
      )}

      {/* PAGES SECTION */}
      <Box className="flex-1 overflow-y-auto pb-4">
        <Box
          className={`
            px-1 text-sm space-y-1
            ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
          `}
        >
          {/* USER PROFILE EXPANDABLE */}
          <Box
            className={`
              sidebar-item flex items-center gap-3 mx-2 px-3 py-2 cursor-pointer rounded-lg
              transition-all duration-150
              ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"}
            `}
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            {React.cloneElement(<Description fontSize="small" />, {
              style: { color: theme === "dark" ? "#E5E5E5" : "#1C1C1C" },
            })}

            {!collapsed && (
              <Box className="flex justify-between w-full pr-1">
                <Typography
                  sx={{ color: theme === "dark" ? "#F5F5F5" : "#1C1C1C" }}
                >
                  User Profile
                </Typography>

                {openProfile ? <ExpandLess /> : <ExpandMore />}
              </Box>
            )}
          </Box>

          {/* COLLAPSE SUBMENU */}
          <Collapse in={!collapsed && openProfile}>
            <Box
              className={`
                ml-10 flex flex-col text-[13px] space-y-1
                ${theme === "dark" ? "text-gray-300" : "text-gray-500"}
              `}
            >
              {[
                "Overview",
                "Projects",
                "Campaigns",
                "Documents",
                "Followers",
              ].map((sub, i) => (
                <Typography
                  key={i}
                  color="inherit"
                  className={`
                    cursor-pointer transition
                    ${
                      theme === "dark" ? "hover:text-white" : "hover:text-black"
                    }
                  `}
                >
                  {sub}
                </Typography>
              ))}
            </Box>
          </Collapse>

          {/* OTHER PAGES */}
          {[
            { icon: <Settings fontSize="small" />, label: "Account" },
            { icon: <Business fontSize="small" />, label: "Corporate" },
            { icon: <Article fontSize="small" />, label: "Blog" },
            { icon: <Chat fontSize="small" />, label: "Social" },
          ].map((item, i) => (
            <Box
              key={i}
              className={`
                sidebar-item flex items-center gap-3 mx-2 px-3 py-2 cursor-pointer rounded-lg transition-all
                ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"}
              `}
            >
              {React.cloneElement(item.icon, {
                style: { color: theme === "dark" ? "#E5E5E5" : "#1C1C1C" },
              })}

              {!collapsed && (
                <Typography
                  sx={{ color: theme === "dark" ? "#F5F5F5" : "#1C1C1C" }}
                >
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
