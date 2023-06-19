import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  const session = useSession();

  const user = session.data?.user;
  return (
    <div className="sticky top-0 px-2 py-4">
      <ul className="white flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user?.id}`}>Profile</Link>
          </li>
        )}
        {user != null ? (
          <li>
            <button onClick={() => void signOut()}>Log out</button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signIn()}>Log in</button>
          </li>
        )}
      </ul>
    </div>
  );
};
