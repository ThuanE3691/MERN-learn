import { useContext, useEffect } from "react";
import { SkillContext } from "../contexts/SkillContext";
import { AuthContext } from "../contexts/AuthContext";
import SingleSkill from "../components/skills/SingleSkill";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ShowToast from "../components/layout/ShowToast";
import AddSkillModel from "../components/skills/AddSkillModal";
import UpdateSkillModal from "../components/skills/UpdateSkillModal";
import addIcon from "../assets/plus-circle-fill.svg";
import Loading from "../components/layout/Loading";

const Dashboard = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    skillState: { skill, skills, skillLoading },
    getSkills,
    setShowAddSkillModal,
  } = useContext(SkillContext);

  useEffect(() => {
    getSkills();
  }, []);

  const openDialog = () => {
    setShowAddSkillModal(true);
  };

  const SkillRender = () => {
    return skills.map((skill) => (
      <Col key={skill._id} className="my-2">
        <SingleSkill skill={skill}></SingleSkill>
      </Col>
    ));
  };

  let body = null;

  if (skillLoading) {
    body = <Loading></Loading>;
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
            <Button variant="primary" onClick={openDialog}>
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {SkillRender()}
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
      {body} 
      <AddSkillModel/>
      {skill !== null && <UpdateSkillModal/>}
      <ShowToast/>
    </div>
  );
};

export default Dashboard;
