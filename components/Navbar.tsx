'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            H
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">Hoopr</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                          Home
                        </Link>
                        <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                            Jobs
                        </Link>
                        <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                            Pricing
                        </Link>
                        <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                            Resources
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <button className="ml-2 px-4 py-2 text-sm font-semibold transition" variant="ghost">
                            Log In
                        </button>
                        <button className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm">
                          Create Job
                        </button>
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4">
                    <div className="flex flex-col gap-3">
                        <Link
                            href="#"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                            Jobs
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                            Resources
                        </Link>
                        <button className="mt-1 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm w-full">
                            Log In
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
