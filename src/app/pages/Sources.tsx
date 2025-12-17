export default function Sources() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Data Sources</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p>
          All program information on RouteFit is sourced from official government websites,
          immigration authorities, and official documentation. We prioritize accuracy and
          transparency in our data collection.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Source Types</h2>
        
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Official Law</h3>
            <p className="text-sm">
              Information derived directly from enacted legislation, published legal codes,
              or official gazette announcements.
            </p>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Official Guidance</h3>
            <p className="text-sm">
              Information from government ministry websites, immigration service portals,
              and official application guides.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Reported Practice</h3>
            <p className="text-sm">
              Information based on documented experiences, official forum posts by authorities,
              and verified community reports.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Verification Process</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Monthly review of all program entries</li>
          <li>Cross-reference with official sources</li>
          <li>Link validation to ensure sources remain accessible</li>
          <li>Update tracking with "as-of" dates</li>
          <li>Community feedback integration</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Report Issues</h2>
        <p>
          If you notice outdated information or have official sources for program updates,
          please help us maintain accuracy by reporting through the "Report update" link
          on individual program pages.
        </p>
      </div>
    </div>
  );
}
