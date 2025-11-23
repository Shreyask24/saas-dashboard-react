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
  Menu,
  MenuItem,
} from "@mui/material";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";

import React, { useMemo, useState } from "react";
import { rows, statusColors } from "../utils/dashboardData";
import {
  DataGrid,
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
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

// Custom pagination wired into DataGrid slots
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  if (!pageCount || pageCount < 1) return null;

  return (
    <Box className="flex justify-end w-full pr-4 py-2">
      <Pagination
        color="primary"
        shape="rounded"
        size="small"
        page={page + 1}
        count={pageCount}
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
      />
    </Box>
  );
}

const OrderList = ({ setSidebarCollapsed, setRightRailCollapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortModel, setSortModel] = useState([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusSelect = (status) => {
    setStatusFilter(status);
    setFilterAnchorEl(null);
  };

  // Toggle sort on "date" when clicking the SwapVert icon
  const handleSortToggle = () => {
    setSortModel((prev) => {
      if (!prev.length) {
        return [{ field: "date", sort: "asc" }];
      }
      const current = prev[0];
      if (current.field !== "date") {
        return [{ field: "date", sort: "asc" }];
      }
      if (current.sort === "asc") {
        return [{ field: "date", sort: "desc" }];
      }
      return [];
    });
  };

  const filteredRows = useMemo(() => {
    const q = searchText.toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        row.id.toLowerCase().includes(q) ||
        row.user.name.toLowerCase().includes(q) ||
        row.project.toLowerCase().includes(q) ||
        row.address.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" || row.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [searchText, statusFilter]);

  const statusOptions = ["All", ...Object.keys(statusColors)];

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

      {/* Toolbar: Add / Filter / Sort + Search */}
      <Box
        className="flex items-center justify-between py-4 mb-4 rounded-lg px-2 ml-4 mr-4"
        style={{
          background: isDark ? "#FFFFFF0D" : "#F7F9FB",
          color: isDark ? "#E5E5E5" : "#1C1C1C",
        }}
      >
        <Box className="flex items-center gap-2">
          <IconButton
            sx={{
              color: isDark ? "#E5E5E5" : "#1C1C1C",
              transition: "transform 0.15s ease",
              "&:active": { transform: "scale(0.9)" },
            }}
          >
            <Add fontSize="small" />
          </IconButton>

          {/* Filter now opens a real status filter menu */}
          <IconButton
            onClick={handleFilterClick}
            sx={{
              color: isDark ? "#E5E5E5" : "#1C1C1C",
              transition: "transform 0.15s ease",
              "&:active": { transform: "scale(0.9)" },
            }}
          >
            <FilterList fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
            MenuListProps={{ dense: true }}
          >
            {statusOptions.map((status) => (
              <MenuItem
                key={status}
                selected={statusFilter === status}
                onClick={() => handleStatusSelect(status)}
              >
                {status}
              </MenuItem>
            ))}
          </Menu>

          {/* Sort now toggles sort on the Date column */}
          <IconButton
            onClick={handleSortToggle}
            sx={{
              color: isDark ? "#E5E5E5" : "#1C1C1C",
              transition: "transform 0.15s ease",
              "&:active": { transform: "scale(0.9)" },
            }}
          >
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

            "& .MuiDataGrid-root": {
              backgroundColor: isDark ? "#FFFFFF0D" : "#FFFFFF",
              color: isDark ? "#E5E5E5" : "#1C1C1C",
            },
            "& .MuiDataGrid-columnSeparator": {
              color: isDark ? "#444" : "#D1D5DB",
            },
            "& .MuiDataGrid-cell": {
              color: isDark ? "#E5E5E5" : "#1C1C1C",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: isDark ? "transparent" : "#FFFFFF",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: isDark ? "#FFFFFF0D" : "#f5f5f5",
            },
            "& .MuiCheckbox-root svg": {
              color: isDark ? "#FFFFFF" : "#000000",
            },
            // PAGINATION
            "& .MuiTablePagination-root": {
              color: isDark ? "#CCCCCC" : "#1C1C1C",
              backgroundColor: isDark ? "#FFFFFF0D" : "#FFFFFF",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: isDark ? "#FFFFFF0D" : "#FFFFFF",
              borderTop: isDark ? "1px solid #333" : "1px solid #E5E7EB",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: isDark ? "transparent" : "#FFFFFF",
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
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              width: "8px",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
              backgroundColor: isDark ? "#555" : "#CFCFCF",
              borderRadius: "8px",
            },
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            pageSizeOptions={[5, 10, 20]}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            slots={{ pagination: CustomPagination }}
            sx={{
              bgcolor: isDark ? "#1C1C1C" : "#FFFFFF",
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
                fontWeight: 600,
              },
              "& .MuiDataGrid-sortIcon": {
                color: isDark ? "#E5E5E5" : "#6b7280",
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
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderList;
