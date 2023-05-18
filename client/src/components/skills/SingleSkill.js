import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SingleSkill = ({ skill: { _id, status, title, description, url } }) => {
  const border_color = {
    LEARNED: "success",
    LEARNING: "warning",
    "TO LEARN": "danger",
  };

  return (
    <Card className="shadow" border={border_color[status]}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge pill variant={border_color[status]}>
                {status}
              </Badge>
            </Col>
            <Col className = 'text-right'>
                {/* <ActionButtons url = {url} _id = {_id}></ActionButtons> */}
                Button
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
