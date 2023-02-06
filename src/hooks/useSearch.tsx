import { createContext, useContext, useState } from 'react';
interface ISearchContext {
  search: string;
  setSearch: (search: string) => void;
}
const searchContext = createContext<ISearchContext>({
  search: '',
  setSearch: () => {},
});

export const useSearch = () => useContext(searchContext);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState('');
  return (
    <searchContext.Provider value={{ search, setSearch }}>
      {children}
    </searchContext.Provider>
  );
};
