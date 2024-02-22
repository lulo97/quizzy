import { SetStateAction, useState } from "react";
import Link from "next/link";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-9">
      <div className="relative flex flex-wrap items-stretch ml-4 h-full">
        <input
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary shadow-sm"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
        />

        <Link
          className="flex items-center rounded-r bg-cyan-400 ml-1 px-6 text-white shadow-md transition duration-150 ease-in-out hover:bg-cyan-500 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-600 active:shadow-lg"
          href={`/search/${searchQuery}`}
        >
          <i className="fa fa-search" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
}

