interface ExportBarProps {
  count: number;
  onExportPDF: () => void;
  onExportCSV: () => void;
  onClear: () => void;
}

export default function ExportBar({ count, onExportPDF, onExportCSV, onClear }: ExportBarProps) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary-600 shadow-lg z-40 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {count} {count === 1 ? 'program' : 'programs'} shortlisted
            </p>
            <p className="text-sm text-gray-600">Ready to export</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Clear
          </button>
          <button
            onClick={onExportCSV}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={onExportPDF}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
