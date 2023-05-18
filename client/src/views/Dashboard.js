import { useContext, useEffect } from "react";
import { SkillContext } from "../contexts/SkillContext";
import { AuthContext } from "../contexts/AuthContext";
import SingleSkill from "../components/skills/SingleSkill";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import AddSkillModel from "../components/skills/AddSkillModal";
import addIcon from "../assets/plus-circle-fill.svg";

const Dashboard = () => {
  const {
    authState: { user: username },
  } = useContext(AuthContext);

  const {
    skillState: { skills, skillLoading },
    getSkills,
    setShowAddSkillModal,
    showToast : {show, message, type},
    setShowToast,
  } = useContext(SkillContext);

  useEffect(() => {
    getSkills();
  }, []);

  const openDialog = () => {
    setShowAddSkillModal(true);
  };

  const showOffToast = () => {
    setShowToast({
      show: false,
      message: "",
      type: null
    })
  }

  let body = null;

  if (skillLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  } else if (skills.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to the LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary">LearnIt</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {skills.map((skill) => (
            <Col key={skill._id} className="my-2">
              <SingleSkill skill={skill}></SingleSkill>
            </Col>
          ))}
        </Row>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new skill to learn</Tooltip>}
        >
          <Button className="btn-floating" onClick={openDialog}>
            <img src={addIcon} alt="add" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <div>
      {body} <AddSkillModel></AddSkillModel>{" "}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={showOffToast}
        delay = {3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Dashboard;
