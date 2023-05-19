import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { SkillContext } from "../../contexts/SkillContext";

const ActionButton = ({ url, _id }) => {
  const { setShowToast, deleteSkill, findSkill, setShowUpdateSkillModal } = useContext(SkillContext);

  const onClickDelete = (_id) => {
    deleteSkill(_id)
    setShowToast({
      show: true,
      type: "success",
      message: "Skill deleted successfully"
    })
  }

  const chooseSkill = (skillId) => {
    findSkill(skillId)
    setShowUpdateSkillModal(true)
  }

  return (
    <div className="ms-5">
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button className="post-button" onClick = {() => chooseSkill(_id)}>
        <img src={editIcon} alt="edit" width="24" height="32" />
      </Button>
      <Button className="post-button" onClick={() => onClickDelete(_id)}>
        <img src={deleteIcon} alt="delete" width="24" height="32" />
      </Button>
    </div>
  );
};

export default ActionButton;
