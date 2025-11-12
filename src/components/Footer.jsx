import { FaFacebookF, FaInstagram, FaLinkedinIn, FaCar } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-yellow-500 ">
            <IoCarSportOutline className="text-yellow-500 text-2xl" />
            <h2 className="text-2xl font-bold ">RentWheels</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Your trusted car rental partner. Reliable, affordable, and available
            anytime you need a ride.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/browse" className="hover:text-blue-400 transition">
                Browse Cars
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-blue-400 transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-400 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400">📧 support@rentwheels.com</p>
          <p className="text-gray-400 mb-4">📞 +880 1234 567890</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-500 ">RentWheels</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
