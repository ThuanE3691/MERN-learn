import Toast from "react-bootstrap/Toast";
import { useContext, useEffect } from "react";
import { SkillContext } from "../../contexts/SkillContext";

const ShowToast = () => {
  const {
    showToast: { show, type, message },
    setShowToast,
  } = useContext(SkillContext);

  const showOffToast = () => {
    setShowToast({
      show: false,
      message: "",
      type: null,
    });
  };

  useEffect(() => {
    setTimeout(() => showOffToast(),3000)
  },[show]);

  return (
    <Toast
      show={show}
      style={{ position: "fixed", top: "20%", right: "10px" }}
      className={`bg-${type} text-white`}
      onClose={showOffToast}
    >
      <Toast.Body>
        <strong>{message}</strong>
      </Toast.Body>
    </Toast>
  );
};

export default ShowToast;
