"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "../utils/firebase";
import { FaSignOutAlt } from "react-icons/fa";
import { LuWalletCards } from "react-icons/lu";


const Navbar = ({ role }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={`shadow-lg bg-teal3 w-full ${role}`}>
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/mindmapper_logo.png"
                alt="Logo"
                width={72}
                height={36}
                className="w-auto h-9 sm:h-11"
              />
            </Link>

            {/* Menu for mobile view */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  // Hamburger Button
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  // Close Button
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Navbar elements */}
          <div
            className={`${
              isOpen
                ? "translate-x-0 opacity-100" // mobile
                : "opacity-0 -translate-x-full gap-5" // default
            } bg-teal3 absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            {user ? (
              <>
                <Link href="/dashboard">
                  <button className="flex items-center mt-4 lg:mt-0 text-white hover:text-orange1/80 p-2 rounded-full transition duration-300">
                    <LuWalletCards size={28} />
                  </button>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center mt-4 lg:mt-0 text-white hover:text-orange1/80 p-2 rounded-full transition duration-300"
                >
                  <FaSignOutAlt size={28} />
                </button>
              </>
            ) : (
              <>
                <button className="flex items-center mt-4 lg:mt-0 text-white hover:bg-white hover:text-orange1/80 px-4 py-2 rounded-md transition duration-300">
                  <Link href="/signin">Sign In</Link>
                </button>
                <button className="flex items-center mt-4 lg:mt-0 text-white bg-orange1 hover:bg-orange1/80 px-4 py-2 rounded-md transition duration-300 shadow-lg">
                  <Link href="/signup">Sign Up</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
