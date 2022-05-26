import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { List } from "react-content-loader";

const User = ({ fullName, username }) => {
  return !username || !fullName ? (
    <List />
  ) : (
    <Link
      to={`p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt="ProfileImage"
          className="rounded-full w-16 flex mr-3"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
};

export default memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
