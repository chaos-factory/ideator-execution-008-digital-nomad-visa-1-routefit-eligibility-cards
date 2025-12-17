interface ExportBarProps {
  count: number;
  onExportPDF: () => void;
  onExportCSV: () => void;
  onClear: () => void;
}

export default function ExportBar({ count, onExportPDF, onExportCSV, onClear }: ExportBarProps) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          <span className="font-semibold">{count}</span> program{count !== 1 ? 's' : ''} shortlisted
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Clear
          </button>
          <button
            onClick={onExportCSV}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Export CSV
          </button>
          <button
            onClick={onExportPDF}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
