export const metadata = {
  title: "Terms of Service | Ushnik Technologies",
  description: "Terms of Service for Ushnik Technologies Pvt. Ltd.",
};

export default function TermsPage() {
  return (
    <div className="bg-brand-white min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-brand-black mb-8 border-b pb-4">Terms of Service</h1>
        
        <div className="prose max-w-none text-gray-700 space-y-6">
          <p><strong>Last Updated:</strong> [EDIT Date]</p>
          
          <h2 className="text-xl font-bold text-brand-black mt-8">1. Use of Website</h2>
          <p>The content provided on this website is for general informational and inquiry purposes only. Ushnik Technologies Pvt. Ltd. reserves the right to modify or discontinue any content or service without prior notice.</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">2. No Commitment</h2>
          <p>Browsing this website, downloading materials, or submitting inquiry/assessment forms does not create any contractual obligation or commercial commitment between you and Ushnik Technologies Pvt. Ltd.</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">3. Intellectual Property</h2>
          <p>All website content, logos, text, graphics, and materials are the property of Ushnik Technologies Pvt. Ltd. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">4. Service Terms</h2>
          <p>All paid services, consulting engagements, and infrastructure deployments are governed by separate, mutually agreed-upon formal service agreements or contracts.</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">5. Limitation of Liability</h2>
          <p>Ushnik Technologies is not liable for any business decisions, infrastructure choices, or financial commitments made based solely on the general content provided on this website.</p>

          <h2 className="text-xl font-bold text-brand-black mt-8">6. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in [Your City], India.</p>
        </div>
      </div>
    </div>
  );
}
