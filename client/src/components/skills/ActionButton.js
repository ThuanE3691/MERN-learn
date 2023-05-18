import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";

const ActionButton = ({ url, _id }) => {
  return (
    <div className = 'ms-5'>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button className="post-button">
        <img src={editIcon} alt="edit" width="24" height="32" />
      </Button>
      <Button className="post-button">
        <img src={deleteIcon} alt="delete" width="24" height="32" />
      </Button>
    </div>
  );
};

export default ActionButton;
