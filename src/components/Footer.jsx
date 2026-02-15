import React from "react";
import logo from "../assets/logo.png";
import googlePlay from "../assets/googlePlay.png";
import appStore from "../assets/appStore.png";
import {
  FaFacebook,
  FaGooglePlay,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer data-aos="fade-up" className="bg-base-300 text-base-content py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
          <div className="space-y-4">
            <img src={logo} alt="logo" className="w-32" />
            <p className="text-sm opacity-80 leading-relaxed">
              During this era, online learning environments grew rapidly —
              empowering learners everywhere to gain new skills anytime,
              anywhere.
            </p>
            <div className="flex items-center gap-3">
              <button className="cursor-pointer hover:scale-105 transition-transform">
                <img src={googlePlay} alt="Google Play" className="h-10" />
              </button>
              <button className="cursor-pointer hover:scale-105 transition-transform">
                <img src={appStore} alt="App Store" className="h-10" />
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 border-l-4 border-primary pl-3">
              Quick Links
            </h2>
            <ul className="space-y-2 text-base opacity-90">
              <li>
                <Link to="/courses" className="hover:text-primary transition">
                  • All Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  • About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  • Contact Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-primary transition">
                  • Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 border-l-4 border-primary pl-3">
              Get in Touch
            </h2>
            <div className="flex gap-5 text-3xl">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-base-200 pt-5 text-center text-sm opacity-80">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;