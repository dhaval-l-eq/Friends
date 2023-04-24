import classes from "./FriendDetail.module.css";

import { Link } from "react-router-dom";
import ProfilePicture from "../../UI/ProfilePicture";
import Button from "../../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import userImage from "../../images/user.png";

function FriendRequestDetail(props) {
  return (
    <li className={classes["user-container"]}>
      <Link
        to={`/home/profile/${props.id}`}
        className={classes["link-container"]}
      >
        <ProfilePicture dp={props.userDp || userImage} className={classes.dp} />
        <p>{props.userName}</p>
      </Link>
      <div className={classes.actions}>
        <Button className={classes["btn-accept"]}>
          <FontAwesomeIcon className={classes["icon-add"]} icon={faCheck} />
          Accept
        </Button>
        <Button className={classes["btn-deny"]}>
          <FontAwesomeIcon className={classes["icon-add"]} icon={faXmark} />
          Deny
        </Button>
      </div>
    </li>
  );
}

export default FriendRequestDetail;
