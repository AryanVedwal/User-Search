import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/user/${user.login}`}
      className="block bg-[#ffffff10] rounded-lg hover:bg-[#ffffff40] duration-200 md:max-w-[400px] max-w-[275px] w-full xs:mx-0 mx-auto"
    >
      <div className="flex items-center p-4">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg text-indigo-400 font-semibold max-w-[150px] ellipsis">
            {user.login}
          </h3>

          <p className="text-gray-100">{user.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
