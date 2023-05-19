import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info"></Spinner>
    </div>
  )
}

export default Loading