import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        );
        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );

        setUser(userResponse.data);
        setRepositories(reposResponse.data);
      } catch (error) {
        setError("Failed to fetch user and repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRepos();
  }, [username]);

  return (
    <div>
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {user && (
        <div className="bg-[#ffffff10] rounded-lg shadow-md p-6">
          <div className="flex items-center mb-8">
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h2 className="text-3xl text-indigo-600 font-semibold">
                {user.name}
              </h2>
              <p className="text-gray-100">{user.login}</p>
              <p className="text-gray-100 mt-2">{user.bio}</p>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl text-indigo-600  font-semibold mb-2">
              User Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-100">Followers: {user.followers}</p>
                <p className="text-gray-100">Following: {user.following}</p>
              </div>
              <div>
                <p className="text-gray-100">
                  Public Repositories: {user.public_repos}
                </p>
                <p className="text-gray-100">
                  Public Gists: {user.public_gists}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl text-indigo-600 font-semibold mb-4">
              Repositories
            </h3>
            {repositories.length === 0 ? (
              <p className="text-gray-100">No repositories found.</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repositories.map((repo) => (
                  <li
                    key={repo.id}
                    className="bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <h4 className="text-lg font-semibold mb-2">
                        {repo.name}
                      </h4>
                    </a>
                    <p className="text-gray-100 mb-2 repo-des">{repo.description}</p>
                    <div className="flex items-center">
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md mr-2">
                        {repo.language}
                      </span>
                      <span className="text-gray-100">
                        <svg
                          className="h-4 w-4 inline-block mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {repo.stargazers_count}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
