import React from 'react';
import { ChevronDown, MoreVertical } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200/50 shadow-soft bg-surface">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-50/80 border-b border-neutral-200/50">
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className={`py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider ${col.className || ''}`}
              >
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-neutral-700 transition-colors">
                  {col.header}
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                </div>
              </th>
            ))}
            <th className="py-4 px-6"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100/80">
          {data.map((row) => (
            <tr 
              key={row.id} 
              onClick={() => onRowClick?.(row)}
              className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`py-4 px-6 text-sm text-neutral-700 ${col.className || ''}`}>
                  {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
              <td className="py-4 px-6 text-right">
                <button className="p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
