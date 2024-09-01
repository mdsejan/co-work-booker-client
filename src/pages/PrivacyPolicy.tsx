import React, { useEffect } from "react";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white py-12">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Welcome to our Privacy Policy page! At CoWorkBooker, we value your
          privacy and are committed to protecting your personal information.
          This policy explains how we collect, use, and safeguard your data.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Information We Collect
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          When you use our service, we collect personal information such as your
          name, email address, phone number, and payment details. This
          information is essential for processing your bookings and providing a
          seamless user experience.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          How We Use Your Information
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We use your information to manage your bookings, communicate with you,
          and improve our services. Your data is never sold or shared with third
          parties, except as required by law or to fulfill our contractual
          obligations.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Data Security
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We implement industry-standard security measures to protect your
          personal data from unauthorized access, disclosure, alteration, and
          destruction. Your payment information is processed securely through
          trusted third-party providers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Rights
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          You have the right to access, modify, or delete your personal
          information. If you wish to exercise these rights, please contact us
          at privacy@coworkbooker.com. We are here to assist you with any
          privacy concerns you may have.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Changes to This Policy
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We may update this privacy policy from time to time. When changes are
          made, we will notify you via email or through prominent notices on our
          website. Please review this page periodically to stay informed about
          how we are protecting your information.
        </p>

        <p className="text-gray-600 leading-relaxed">
          If you have any questions about this Privacy Policy, feel free to
          contact us at privacy@coworkbooker.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
