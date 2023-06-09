import Badge from "react-bootstrap/Badge";
import ActionButton from "./ActionButton";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SingleSkill = ({ skill: { _id, status, title, description, url } }) => {
  const status_color = {
    LEARNED: "success",
    LEARNING: "warning",
    "TO LEARN": "danger",
  };

  return (
    <Card className="shadow" border={status_color[status]}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge pill className = {`bg-${status_color[status]}`}>
                {status}
              </Badge>
            </Col>
            <Col className="">
                <ActionButton url = {url} _id = {_id}></ActionButton>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
            {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleSkill;
