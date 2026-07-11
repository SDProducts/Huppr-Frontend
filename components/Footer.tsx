import {
  Mail, MapPin, Phone,
  // Twitter, Linkedin, Github, Youtube
} from 'lucide-react';
import Link from 'next/link';

const productLinks = ['Recruitment', 'HR Management', 'AI Features', 'Integrations'];
const companyLinks = ['About Us', 'Careers', 'Press Kit', 'Contact'];
const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid md:grid-cols-6 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                H
                            </div>
                            <span className="text-xl font-bold text-white">Hoopr</span>
                        </div>
                        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                            The intelligent workforce platform for hiring, managing, and growing your team.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                              {/*<Twitter className="w-4 h-4" />*/}
                              Twitter
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                              {/*<Linkedin className="w-4 h-4" />*/}
                              LinkedIn
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                              {/*<Github className="w-4 h-4" />*/}
                              Github
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                {/*<Youtube className="w-4 h-4" />*/}
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
                        <ul className="space-y-2.5 text-sm">
                            {productLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
                        <ul className="space-y-2.5 text-sm">
                            {companyLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
                        <ul className="space-y-2.5 text-sm">
                            {legalLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>hello@hoopr.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>San Francisco, CA</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>+1 (555) 000-0000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <span>© 2026 Hoopr Inc. All rights reserved.</span>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-gray-300 transition">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-300 transition">Terms of Service</Link>
                        <Link href="#" className="hover:text-gray-300 transition">Cookie Policy</Link>
                        <Link href="#" className="hover:text-gray-300 transition">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
