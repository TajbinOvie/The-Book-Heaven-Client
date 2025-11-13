import React from 'react';
import { format } from 'date-fns';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // <-- new X (Twitter) icon

const Footer = () => {
    const currentYear = format(new Date(), 'yyyy');

    return (
        <footer className="bg-indigo-600 text-white p-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">

                {/* Logo & Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">Book Heaven</h2>
                    <p className="text-indigo-200">
                        Explore, discover, and share your favorite books. Your ultimate library experience online.
                    </p>
                </div>

                {/* Company */}
                <div>
                    <h6 className="text-lg font-semibold mb-4">Company</h6>
                    <ul className="space-y-2">
                        <li><a className="hover:text-indigo-200 transition">About Us</a></li>
                        <li><a className="hover:text-indigo-200 transition">Contact</a></li>
                        <li><a className="hover:text-indigo-200 transition">Jobs</a></li>
                        <li><a className="hover:text-indigo-200 transition">Press Kit</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h6 className="text-lg font-semibold mb-4">Legal</h6>
                    <ul className="space-y-2">
                        <li><a className="hover:text-indigo-200 transition">Terms of Use</a></li>
                        <li><a className="hover:text-indigo-200 transition">Privacy Policy</a></li>
                        <li><a className="hover:text-indigo-200 transition">Cookie Policy</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h6 className="text-lg font-semibold mb-4">Follow Us</h6>
                    <div className="flex gap-4 mt-2">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-200 transition"
                        >
                            <FaFacebookF size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-200 transition"
                        >
                            <FaXTwitter size={20} /> {/* X logo */}
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-200 transition"
                        >
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-sm text-indigo-200">
                © {currentYear} Book Heaven. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
