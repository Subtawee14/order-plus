import { useSearch } from '@/hooks/useSearch';
import SearchIcon from '@/icons/Search';

export default function SearchBox() {
  const { search, setSearch } = useSearch();
  return (
    <div className="lg:w-60">
      <div className="relative mt-1 flex items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}
