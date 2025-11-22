import {
  Add,
  CalendarMonth,
  DarkMode,
  FilterList,
  LightMode,
  ManageHistory,
  NotificationsNone,
  Search,
  StarBorder,
  SwapVert,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";

import React, { useState } from "react";
import { rows, statusColors } from "../utils/dashboardData";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "../components/layout/PageHeader";
import { useTheme } from "../context/ThemeContext";

const columns = [
  { field: "id", headerName: "Order ID", width: 120 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => (
      <Box className="flex items-center gap-3">
        <Avatar src={params.value.avatar} />
        <Typography sx={{ color: "inherit" }}>{params.value.name}</Typography>
      </Box>
    ),
  },
  { field: "project", headerName: "Project", width: 220 },
  { field: "address", headerName: "Address", width: 250 },
  {
    field: "date",
    headerName: "Date",
    width: 170,
    renderCell: (params) => (
      <Box className="flex items-center gap-2">
        <CalendarMonth fontSize="small" />
        <Typography sx={{ color: "inherit" }}>{params.value}</Typography>
      </Box>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <Box className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: statusColors[params.value] }}
        ></span>
        <Typography sx={{ color: statusColors[params.value] }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
];

function CustomPagination() {
  return null; // keep your existing pagination logic if needed
}

const OrderList = ({ setSidebarCollapsed, setRightRailCollapsed }) => {
  const [searchText, setSearchText] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const filteredRows = rows.filter((row) => {
    const q = searchText.toLowerCase();
    return (
      row.id.toLowerCase().includes(q) ||
      row.user.name.toLowerCase().includes(q) ||
      row.project.toLowerCase().includes(q) ||
      row.address.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q)
    );
  });

  return (
    <Box
      component="main"
      className="flex-1 overflow-auto"
      style={{
        background: isDark ? "#0F0F0F" : "#FFFFFF",
        color: isDark ? "#E5E5E5" : "#1C1C1C",
      }}
    >
      <PageHeader
        title="Orders List"
        breadcrumb="Dashboards"
        setSidebarCollapsed={setSidebarCollapsed}
        setRightRailCollapsed={setRightRailCollapsed}
      />

      <Box className="mt-8 mb-4 ml-4">
        <Typography sx={{ color: "inherit" }} className="text-sm font-semibold">
          Order List
        </Typography>
      </Box>

      <Box
        className="flex items-center justify-between py-4 mb-4 rounded-lg px-2 ml-4 mr-4"
        style={{
          background: isDark ? "#FFFFFF0D" : "#F7F9FB",
          color: isDark ? "#E5E5E5" : "#1C1C1C",
        }}
      >
        <Box className="flex items-center gap-2">
          <IconButton sx={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}>
            <Add fontSize="small" />
          </IconButton>

          <IconButton sx={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}>
            <FilterList fontSize="small" />
          </IconButton>

          <IconButton sx={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}>
            <SwapVert fontSize="small" />
          </IconButton>
        </Box>

        <TextField
          size="small"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            width: 220,
            input: {
              color: isDark ? "#FFFFFF" : "#1C1C1C",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              height: 38,
              background: isDark ? "#1A1A1A" : "#FFFFFF",
              "& fieldset": {
                borderColor: isDark ? "#3A3A3A" : "#D1D5DB",
              },
              "&:hover fieldset": {
                borderColor: isDark ? "#5A5A5A" : "#BDBDBD",
              },
              "&.Mui-focused fieldset": {
                borderColor: isDark ? "#8A8A8A" : "#3B82F6",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: isDark ? "#A1A1A1" : "#6B7280",
              opacity: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search
                  fontSize="small"
                  sx={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className="grid grid-cols-12 gap-6 p-6 w-full">
        <Box
          className="col-span-12"
          sx={{
            minHeight: 370,
            width: "100%",

            // ROOT TABLE BACKGROUND
            "& .MuiDataGrid-root": {
              backgroundColor: isDark ? "#FFFFFF0D" : "#FFFFFF",
              color: isDark ? "#E5E5E5" : "#1C1C1C",
            },

            // HEADER SEPARATOR
            "& .MuiDataGrid-columnSeparator": {
              color: isDark ? "#444" : "#D1D5DB",
            },

            // CELLS
            "& .MuiDataGrid-cell": {
              color: isDark ? "#E5E5E5" : "#1C1C1C",
            },

            // ROW BACKGROUND
            "& .MuiDataGrid-row": {
              backgroundColor: isDark ? "transparent" : "#FFFFFF",
            },

            // ROW HOVER
            "& .MuiDataGrid-row:hover": {
              backgroundColor: isDark ? "#FFFFFF0D" : "#f5f5f5",
            },

            // CHECKBOX
            "& .MuiCheckbox-root svg": {
              color: isDark ? "#FFFFFF" : "#000000",
            },

            // PAGINATION
            "& .MuiTablePagination-root": {
              color: isDark ? "#CCCCCC" : "#1C1C1C",
              backgroundColor: isDark ? "#FFFFFF0D" : "#FFFFFF",
            },

            // FOOTER BACKGROUND
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: isDark ? "#FFFFFF0D" : "#FFFFFF",
              borderTop: isDark ? "1px solid #333" : "1px solid #E5E7EB",
            },

            // SCROLLER AREA
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: isDark ? "transparent" : "#FFFFFF",
            },
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[5]}
            sx={{
              bgcolor: isDark ? "#FFFFFF0D" : "#FFFFFF",
              color: isDark ? "#E5E5E5" : "#1C1C1C",
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: isDark ? "#121212" : "#f9fafb",
                borderBottom: isDark ? "1px solid #333" : "1px solid #E5E7EB",
              },

              "& .MuiDataGrid-columnHeader": {
                backgroundColor: isDark ? "#121212" : "#f9fafb",
                color: isDark ? "#E6E6E6" : "#1C1C1C",
              },

              "& .MuiDataGrid-columnHeaderTitle": {
                color: isDark ? "#F2F2F2 !important" : "#1C1C1C",
                fontWeight: 600,
              },

              "& .MuiDataGrid-sortIcon": {
                color: isDark ? "#E6E6E6 !important" : "#6b7280",
              },

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: isDark ? "#000000" : "#f9fafb",
                color: isDark ? "#D1D1D1" : "#6b7280",
                borderBottom: isDark ? "1px solid #333" : "1px solid #E5E7EB",
              },

              "& .MuiDataGrid-columnHeaderTitle": {
                color: isDark ? "#E6E6E6" : "#1C1C1C",
              },

              "& .MuiDataGrid-sortIcon": {
                color: isDark ? "#E6E6E6" : "#6b7280",
              },

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: isDark ? "#FFFFFF0D" : "#f9fafb",
                color: isDark ? "#E5E5E5" : "#6b7280",
                borderBottom: isDark ? "1px solid #333" : "1px solid #E5E7EB",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: isDark ? "#E5E5E5" : "#1C1C1C",
              },
              "& .MuiDataGrid-sortIcon": {
                color: isDark ? "#E5E5E5" : "#6b7280",
              },

              "& .MuiDataGrid-cell": {
                color: isDark ? "#E5E5E5" : "#1C1C1C",
              },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: isDark ? "#FFFFFF1A" : "#f5f5f5",
              },

              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: isDark ? "#FFFFFF26" : "#EDEDED",
              },
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: isDark ? "#FFFFFF33" : "#E0E0E0",
              },

              "& .MuiCheckbox-root svg": {
                color: isDark ? "#FFFFFF" : "#000000",
              },

              "& .MuiTablePagination-root": {
                color: isDark ? "#E5E5E5" : "#1C1C1C",
                backgroundColor: isDark ? "#FFFFFF0D" : "#FFFFFF",
                borderTop: isDark ? "1px solid #333" : "1px solid #E5E7EB",
              },

              "& .MuiPaginationItem-root": {
                color: isDark ? "#E5E5E5" : "#1C1C1C",
                backgroundColor: "transparent",
                borderRadius: "8px",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: isDark ? "#FFFFFF2B" : "#EDEDED",
                color: "#FFFFFF",
                fontWeight: 600,
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: isDark ? "#FFFFFF1A" : "#F2F2F2",
              },

              // SCROLLBAR
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                width: "8px",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                backgroundColor: isDark ? "#555" : "#CFCFCF",
                borderRadius: "8px",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderList;
