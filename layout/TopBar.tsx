"use client"

import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import SearchBar from "./topbar/SearchBar";
import CategoryDropdown from "./topbar/CategoryDropdown";
import Logo from "./topbar/Logo";
import CreateQuizButton from "./topbar/CreateQuizButton";
import ProfileButton from "./topbar/ProfileButton";

export default function TopBar() {

    const { userId } = useAuth();
    const profile_url = `/profile/${userId}`

    return (
        <nav className="fixed top-0 font-sans flex flex-row items-center justify-between text-center px-6 py-2 bg-white shadow w-full z-50">
            
        <Logo />

        <div className="flex flex-row items-center justify-between gap-3">
          <CategoryDropdown />
          <CreateQuizButton />
          <SearchBar />
        </div>

        <div className="flex justify-center gap-3">
          <ProfileButton profile_url={profile_url} />
          <UserButton afterSignOutUrl="/"/>
        </div>
      </nav>
    )
}