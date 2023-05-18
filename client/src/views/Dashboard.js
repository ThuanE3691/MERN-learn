import { useContext, useEffect } from "react";
import { SkillContext } from "../contexts/SkillContext";
import { AuthContext } from "../contexts/AuthContext";
import SingleSkill from "../components/skills/SingleSkill";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  const {
    authState: { user: username },
  } = useContext(AuthContext);

  const {
    skillState: { skills, skillLoading },
    getSkills,
  } = useContext(SkillContext);

  useEffect(() => {
    getSkills();
  }, []);

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
      </>
    );
  }

  return <div>{body}</div>;
};

export default Dashboard;
