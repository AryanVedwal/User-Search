import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import UserList from "./UserList";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const usersRef = useRef([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${query}`
        );
        usersRef.current = response.data.items;
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchUsers();
    }
  }, [query]);

  return (
    <div>
      <SearchBar setQuery={setQuery} />
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && <UserList users={usersRef.current} />}
    </div>
  );
};

export default SearchPage;
