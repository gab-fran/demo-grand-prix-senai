export default function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl2 border border-line bg-surface">
      <table className="min-w-full text-sm">
        <thead className="border-b border-line text-left text-muted">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-line/60 last:border-0">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-zinc-200">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
