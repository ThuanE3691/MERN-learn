import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { SkillContext } from "../../contexts/SkillContext";

const UpdateSkillModal = () => {
  const {
    skillState: { skill },
    showUpdateSkillModal,
    setShowUpdateSkillModal,
    updateSkill,
    setShowToast,
  } = useContext(SkillContext);

  const [updatedSkill, setUpdatedSkill] = useState(skill);

  const { title, description, url, status } = updatedSkill;

  useEffect(() => {
    setUpdatedSkill(skill)
  }, [skill])

  const onChangeUpdatedSkillForm = (event) =>
    setUpdatedSkill({
      ...updatedSkill,
      [event.target.name]: event.target.value,
    });

  const closeDialog = () => {
    setUpdatedSkill(skill)
    setShowUpdateSkillModal(false)
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { success, message } = await updateSkill(updatedSkill);
      setShowUpdateSkillModal(false)
      setShowToast({
        show: true,
        message: message,
        type: success ? "success" : "danger",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return skill !== null ? (
    <Modal show={showUpdateSkillModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making Progess?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedSkillForm}
            ></Form.Control>
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedSkillForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedSkillForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangeUpdatedSkillForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update Skill
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  ) : (
    <></>
  );
};

export default UpdateSkillModal;
