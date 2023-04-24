import { useSelector } from "react-redux";
import classes from "./FindFriends.module.css";
import FriendRequestDetail from "./FriendRequestDetail";

function Friends() {
  const authUser = useSelector((state) => state.users.authUser);
  const friendRequests = authUser.friendRequests || null;

  return (
    <>
      <section className={classes.container}>
        <h2>Your Friends</h2>
      </section>

      <section className={classes.container}>
        <h2>Friend Requests</h2>
        {friendRequests && (
          <ul>
            {friendRequests.map((request) => (
              <FriendRequestDetail
                key={request.userId}
                userName={request.userName}
                userDp={request.userDp}
                userId={request.userId}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Friends;
