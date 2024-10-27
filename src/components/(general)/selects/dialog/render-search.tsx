import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SELECT_DATA } from "@/data/components";

const RenderSearch: React.FC<{
  searchText: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ searchText, handleSearchChange }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full relative flex flex-nowrap items-center">
        <Input
          id="q"
          name="q"
          autoCapitalize="off"
          placeholder={SELECT_DATA["search-placeholder"]}
          type="search"
          value={searchText}
          onChange={handleSearchChange}
          className="bg-white dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="absolute right-0 inline-flex w-fit h-full cursor-default aspect-square items-center justify-center px-4 py-0 rounded-tr-md rounded-br-md bg-pri-2/60">
          <Search className="w-auto h-1/2" />
        </button>
      </div>
    </div>
  );
};

export default RenderSearch;
