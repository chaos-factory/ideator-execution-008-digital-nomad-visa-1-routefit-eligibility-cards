export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p className="text-sm text-gray-500">Last updated: December 17, 2024</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
        <p>
          RouteFit is designed with privacy in mind. We collect minimal information necessary
          to provide our service:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Filter selections (stored in URL parameters for shareability)</li>
          <li>Analytics data (only if you explicitly consent via the consent banner)</li>
          <li>Currency conversion cache (stored locally in your browser)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide eligibility calculations based on your inputs</li>
          <li>To improve user experience (only with your consent)</li>
          <li>To understand usage patterns for product development (only with consent)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Storage</h2>
        <p>
          All data is processed client-side in your browser. We do not transmit your personal
          filter selections to our servers. The only external request is to the European Central
          Bank (ECB) API for currency exchange rates, which does not include any personal information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Analytics</h2>
        <p>
          We use analytics only with your explicit consent. You can opt out at any time by
          clearing your browser's local storage for this site. Analytics data helps us understand:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Which programs are most viewed</li>
          <li>How users interact with filters</li>
          <li>Which features are most useful</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Frankfurter API (ECB exchange rates) - no personal data shared</li>
          <li>GitHub Pages (hosting) - standard web server logs apply</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Decline analytics tracking</li>
          <li>Clear all locally stored data</li>
          <li>Request information about data we may have collected</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any
          changes by posting the new privacy policy on this page and updating the
          "Last updated" date.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us through our
          GitHub repository.
        </p>
      </div>
    </div>
  );
}
