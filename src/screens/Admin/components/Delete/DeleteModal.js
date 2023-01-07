
import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
import PuffLoader from "react-spinners/PuffLoader";
import {getUrl} from "../../../../helper/url-helper";

const override = {
  display: "block",
  margin: "0 auto",
};

function DeleteModal({product, deleteProduct, index}) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#314266");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function delProduct(){
    setLoading(true);
    async function deleteItem(){
      try{

        let response = await fetch(`${getUrl()}/items/delete-product/${product.id}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        })

        return await response.json();
      } catch(err){
        console.log(err);
      }
    }

    deleteItem().then(data => {
      setLoading(false);
      console.log(data);
      deleteProduct(index, handleClose);
    });
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Remove
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {loading && <div className="spinner-container">
          <div style={{marginTop: "0px"}}>
            <PuffLoader color={color} loading={loading} cssOverride={override} size={100}/>
          </div>
        </div>}
        Are you sure you want to delete {product.productName}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
            delProduct();
          }}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
