import React, { useEffect } from "react";

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white py-12">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Terms of Service
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Welcome to CoWorkBooker! By using our services, you agree to comply
          with and be bound by the following terms and conditions. Please review
          them carefully.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          By accessing and using our website, you accept and agree to be bound
          by the terms and provisions of this agreement. If you do not agree to
          these terms, you are prohibited from using the service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          2. Use of the Service
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          You agree to use our booking platform solely for its intended purpose:
          reserving meeting rooms in our co-working spaces. Any misuse or
          unauthorized use of the service may result in account termination and
          legal action.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          3. Account Responsibilities
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account. Please notify us immediately if you suspect any unauthorized
          use of your account.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          4. Payments and Cancellations
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          All bookings must be paid in full at the time of reservation.
          Cancellations made within 24 hours of the booking may be subject to
          fees. Please review our cancellation policy for more details.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          5. User Conduct
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          You agree not to engage in any behavior that disrupts the service or
          violates the rights of others. This includes, but is not limited to,
          vandalism, harassment, and unauthorized access to other users'
          accounts or data.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          6. Termination
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We reserve the right to suspend or terminate your account at any time
          if you violate these terms. Upon termination, you will no longer have
          access to your account or any associated services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          CoWorkBooker shall not be liable for any indirect, incidental, or
          consequential damages arising from your use of the service, including
          loss of data or profit, even if we have been advised of the
          possibility of such damages.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          8. Changes to the Terms
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We may update these terms from time to time. When changes are made, we
          will notify you via email or through prominent notices on our website.
          Continued use of the service constitutes your acceptance of the new
          terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          9. Governing Law
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          These terms are governed by and construed in accordance with the laws
          of [Your Country/State]. Any disputes arising from the use of the
          service will be resolved in the courts of [Your Jurisdiction].
        </p>

        <p className="text-gray-600 leading-relaxed">
          If you have any questions about these Terms of Service, feel free to
          contact us at support@coworkbooker.com.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
