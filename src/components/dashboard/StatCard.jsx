import { TrendingDown, TrendingUp } from "@mui/icons-material";
import { motion } from "framer-motion";

const bgMap = {
  customers: "bg-[#E3F5FF]",
  orders: "bg-[#F7F9FB]",
  revenue: "bg-[#F7F9FB]",
  growth: "bg-[#E5ECF6]",
};

export default function StatCard({ title, value, sub, id }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.22 }}
    >
      <div
        className={`
    ${bgMap[id]}
    w-[202px] h-28 min-w-[200px]
    rounded-2xl p-6
    flex flex-col justify-between
    shadow-sm black
  `}
      >
        <div className="text-sm font-semibold">{title}</div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">{value}</div>
          </div>

          <div className="text-xs font-medium flex items-center gap-1">
            {sub}
            {sub.startsWith("-") ? (
              <TrendingDown fontSize="14" />
            ) : (
              <TrendingUp fontSize="14" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
