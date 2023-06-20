import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { ButtonHoverBgEffect } from "../utils/ButtonHoverBgEffect";
import { Home, User, LogIn, LogOut } from "lucide-react";

export const Sidebar = () => {
  const session = useSession();

  const user = session.data?.user;
  return (
    <div className="sticky top-0 px-2 py-4">
      <ul className="white flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <ButtonHoverBgEffect>
              <span className="flex items-center gap-4">
                <Home className="h-5 w-5" />
                <span className="hidden md:inline">Home</span>
              </span>
            </ButtonHoverBgEffect>
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user?.id}`}>
              <ButtonHoverBgEffect>
                <span className="flex items-center gap-4">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">Profile</span>
                </span>
              </ButtonHoverBgEffect>
            </Link>
          </li>
        )}
        {user != null ? (
          <li>
            <button onClick={() => void signOut()}>
              <ButtonHoverBgEffect>
                <span className="flex items-center gap-4">
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">Log Out</span>
                </span>
              </ButtonHoverBgEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signIn()}>
              <ButtonHoverBgEffect>
                <span className="flex items-center gap-4">
                  <LogIn className="h-5 w-5" />
                  <span className="hidden md:inline">Log In</span>
                </span>
              </ButtonHoverBgEffect>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
