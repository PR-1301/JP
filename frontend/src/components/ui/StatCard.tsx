import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-panel p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-serif font-bold text-neutral-900">{value}</h3>
          
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span className={cn("font-medium", trend.isPositive ? "text-green-600" : "text-red-600")}>
                {trend.isPositive ? '+' : '-'}{trend.value}
              </span>
              <span className="text-neutral-400 ml-2">from last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};
