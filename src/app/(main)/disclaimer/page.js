export const metadata = {
  title: "Disclaimer | Ushnik Technologies",
  description: "General Disclaimer for Ushnik Technologies Pvt. Ltd.",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-brand-white min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-brand-black mb-8 border-b pb-4">Disclaimer</h1>
        
        <div className="prose max-w-none text-gray-700 space-y-6">
          <h2 className="text-xl font-bold text-brand-black mt-8">General Disclaimer</h2>
          <p>
            The content on this website is provided for general informational purposes only. It does not constitute professional advice, a commercial offer, or a binding proposal of any kind. Infrastructure cost estimates, optimization recommendations, and service capabilities described on this website are indicative only and subject to detailed evaluation.
          </p>

          <p>
            All partnerships, collaborations, and technology relationships described on this website are subject to applicable commercial terms and mutual agreements. Ushnik Technologies Pvt. Ltd. reserves the right to modify, update, or discontinue any service, partnership, or content without prior notice.
          </p>

          <p>
            For any service engagement, Ushnik Technologies will provide a formal proposal or agreement. No payment or commitment should be made based solely on website content without a formal written agreement from Ushnik Technologies Pvt. Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}
