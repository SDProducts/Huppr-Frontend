"use client";

import Logo from "@/assets/huppr_logo2.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const productLinks = [
  "Recruitment",
  "HR Management",
  "AI Features",
  "Integrations",
];
const companyLinks = ["About Us", "Careers", "Press Kit", "Contact"];
const legalLinks = [
  { label: "Privacy Policy", link: "/policy" },
  { label: "Terms of Service", link: "/terms" },
  { label: "Cookie Policy", link: "/cookies" },
  { label: "Security", link: "/security" },
];

export default function Footer() {
  // const pathname = usePathname();
  // const isJobs = pathname === "/jobs" || pathname.startsWith(`/jobs/`);
  return (
    <footer className="layout-footer mt-10">
      <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={Logo}
                alt="Huppr Logo"
                loading="eager"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              The intelligent workforce platform for hiring, managing, and
              growing your team.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                {/*<Twitter className="w-4 h-4" />*/}
                <Icon icon="bi:twitter-x" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                {/*<Linkedin className="w-4 h-4" />*/}
                <Icon icon="bi:linkedin" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                {/*<Github className="w-4 h-4" />*/}
                <Icon icon="bi:github" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                {/*<Youtube className="w-4 h-4" />*/}
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href="#" className="hover:text-primary transition">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href="#" className="hover:text-primary transition">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className="hover:text-primary transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          {/*<div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
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
          </div>*/}
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto mt-12 pt-6 grid place-content-center items-center gap-4 text-xs">
          <span>© 2026 Hoopr Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
