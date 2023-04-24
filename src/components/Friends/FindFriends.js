import { useSelector } from "react-redux";
import userImage from "../../images/user.png";
import FriendDetail from "./FriendDetail";

import classes from "./FindFriends.module.css";

function FindFriends() {
  const authUser = useSelector((state) => state.users.authUser);
  const users = useSelector((state) => state.users.users);
  const usersToDisplay = users.filter((user) => user.id !== authUser.id);

  return (
    <section className={classes.container}>
      <h2>Here are some suggestions...</h2>
      <ul>
        {usersToDisplay.map((user) => (
          <FriendDetail
            key={user.id}
            id={user.id}
            dp={user.profilePicture || userImage}
            friendRequests={user.friendRequests || null}
            userName={user.userName}
            authUser={authUser}
          />
        ))}
      </ul>
    </section>
  );
}

export default FindFriends;
