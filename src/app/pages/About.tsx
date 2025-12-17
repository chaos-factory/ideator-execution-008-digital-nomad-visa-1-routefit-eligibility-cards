export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About RouteFit</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p>
          RouteFit helps digital nomads, remote workers, and location-independent professionals find
          visa and residence programs that match their unique situation.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p>
          We believe that navigating visa requirements shouldn't be a barrier to location independence.
          RouteFit provides fast, accurate eligibility snapshots to help you make informed decisions
          about where you can legally work remotely.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Fast eligibility checks for 20+ digital nomad visa programs</li>
          <li>Filtering by nationality, work type, income, and family situation</li>
          <li>Real-time currency conversion using ECB rates</li>
          <li>Official source links and confidence ratings</li>
          <li>Export capabilities for shortlisted programs</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Quality</h2>
        <p>
          All program information is sourced from official government websites and documentation.
          We verify and update our database monthly to ensure accuracy. Each program entry includes:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Last verification date</li>
          <li>Confidence level (official law, official guidance, or reported practice)</li>
          <li>Direct link to official sources</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Disclaimer</h2>
        <p className="text-red-600">
          RouteFit provides information only and is not legal advice. Visa and residence requirements
          change frequently and may have conditions not reflected in our simplified eligibility logic.
          Always verify current requirements with official sources and consult qualified immigration
          professionals before making travel or relocation decisions.
        </p>
      </div>
    </div>
  );
}
