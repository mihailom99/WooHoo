"use client";

import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function Navbar() {
  const { signOut, user } = useAuth();
  return (
    <nav className="relative z-50 bg-[#8A2BE2] shadow-[0_0_20px_#B666D9]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-3 text-purple-300 hover:text-white transition font-bold text-2xl hover:scale-105 transition-transform"
          >
            WooHoo
          </Link>

         { user && ( <div className="hidden md:flex items-center space-x-10">
            <Link
              href="/matches"
              className="text-purple-300 hover:text-white transition"
            >
              Discover
            </Link>

            <Link
              href="/matches/list"
              className="text-purple-300 hover:text-white transition"
            >
              Matches
            </Link>

            <Link
              href="/chat"
              className="text-purple-300 hover:text-white transition"
            >
              Messages
            </Link>

            <Link
              href="/profile"
              className="text-purple-300 hover:text-white transition"
            >
              Profile
            </Link>
          </div>
          )}

          {user ? (
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-transform hover:scale-105 hover:cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3"
                />
              </svg>
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-transform hover:scale-105"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
