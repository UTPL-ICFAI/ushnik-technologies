export const metadata = {
  title: "Privacy Policy | Ushnik Technologies",
  description: "Privacy Policy for Ushnik Technologies Pvt. Ltd.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-brand-white min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-brand-black mb-8 border-b pb-4">Privacy Policy</h1>
        
        <div className="prose max-w-none text-gray-700 space-y-6">
          <p><strong>Last Updated:</strong> [EDIT Date]</p>
          
          <h2 className="text-xl font-bold text-brand-black mt-8">1. What data we collect</h2>
          <p>We collect information that you provide directly to us through forms on our website. This includes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Name, email address, and phone number</li>
            <li>Company details and designation</li>
            <li>Infrastructure usage data submitted through our Assessment Form</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-black mt-8">2. How we use it</h2>
          <p>We use the data we collect solely for the purposes of:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Infrastructure assessment and requirement evaluation</li>
            <li>Providing consultation and service delivery</li>
            <li>Communication regarding your inquiries</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-black mt-8">3. Data sharing</h2>
          <p>We do not sell or share your personal data with third parties without your explicit consent, except as strictly required for service delivery with trusted infrastructure partners (e.g., submitting a data center requirement on your behalf, with prior approval).</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">4. Data retention</h2>
          <p>Assessment data and form submissions are retained for [X] months for follow-up purposes. If no commercial engagement occurs, data is securely deleted thereafter.</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">5. User rights</h2>
          <p>You have the right to access, correct, or delete your personal data. To exercise these rights, please email us at <a href="mailto:privacy@ushniktechnologies.com" className="text-brand-red hover:underline">privacy@ushniktechnologies.com</a>.</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">6. Cookies</h2>
          <p>Our website uses cookies for analytics purposes (e.g., Google Analytics) to improve user experience. Users may opt out of tracking by adjusting their browser settings or using opt-out extensions.</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">7. Contact for privacy concerns</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@ushniktechnologies.com" className="text-brand-red hover:underline">contact@ushniktechnologies.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
