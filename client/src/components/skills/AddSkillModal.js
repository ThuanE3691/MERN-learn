import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { SkillContext } from "../../contexts/SkillContext";

const AddSkillModel = () => {
  const { showAddSkillModal, setShowAddSkillModal, addSkill, setShowToast } =
    useContext(SkillContext);

  const [newSkill, setNewSkill] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newSkill;

  const onChangeNewSkillForm = (event) =>
    setNewSkill({ ...newSkill, [event.target.name]: event.target.value });

  const resetAddSkill = () => {
    setNewSkill({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setShowAddSkillModal(false);
  };

  const closeDialog = () => {
    resetAddSkill();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { success, message } = await addSkill(newSkill);resetAddSkill();
      resetAddSkill();
      setShowToast({show: true, message: message, type: success ? "success" : "danger"});
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Modal show={showAddSkillModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn</Modal.Title>
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
              onChange={onChangeNewSkillForm}
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
              onChange={onChangeNewSkillForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeNewSkillForm}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LEARNIT!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddSkillModel;
