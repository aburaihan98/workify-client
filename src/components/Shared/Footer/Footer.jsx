const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">About the Company</h3>
            <p>
              We are a leading company providing top-notch employee management
              solutions. Our mission is to streamline workflows, ensure seamless
              payroll management, and create a productive work environment for
              employees and HR.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="hover:text-gray-400">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-gray-400">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <p>
              <strong>Address:</strong> 123 Employee Lane, HR City, Work State
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@company.com" className="hover:text-gray-400">
                info@company.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> +123 456 7890
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center border-t border-gray-700 pt-4">
          <p>&copy; 2025 Workify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
