import React from "react";
import { useSearchParams } from "react-router-dom";

type Props = {};

const Search: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const searchQuery = searchParams.get("q");
  return <div>{searchQuery}</div>;
};

export default Search;
