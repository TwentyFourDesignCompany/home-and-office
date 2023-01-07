
import React, {useState} from "react";
import {
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import PuffLoader from "react-spinners/PuffLoader";
import Input from "../Input/InputField";
import {v4 as uuid} from "uuid";
import {Form, Button, Card, Modal} from "react-bootstrap";
import Badge from "../Badge/Badge";
import AWS from "aws-sdk";
import tempColors from "css-color-names";
import {v4} from "uuid";
import {getUrl} from "../../../../helper/url-helper";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3({
  params: { Bucket: "homeandoffice"},
  region: "us-east-1",
});

const override = {
  display: "block",
  margin: "0 auto",
};

const colors = [];

for (const [key, value] of Object.entries(tempColors)) {
  colors.push(key);
}

function EditModal({product, show, onHide}) {
  const [values, setValues] = useState(product);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
  const [priceError, setPriceError] = useState(false);
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [colorsError, setColorsError] = useState(false);
  const [colorsErrorMessage, setColorsErrorMessage] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [commentErrorMessage, setCommentErrorMessage] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [detailsErrorMessage, setDetailsErrorMessage] = useState("");
  const [discountError, setDiscountError] = useState(false);
  const [discountErrorMessage, setDiscountErrorMessage] = useState("");
  const [dimensionsError, setDimensionsError] = useState(false);
  const [dimensionsErrorMessage, setDimensionsErrorMessage] = useState("");
  const [othersError, setOthersError] = useState(false);
  const [othersErrorMessage, setOthersErrorMessage] = useState("");
  const [images, setImages] = useState([]);
  const [color, setColor] = useState("#314266");

  function handleChange(e){
    let name = e.target.name;

    switch (name){
      case "productName":
        setNameError(false);
        break;

      case "details":
        setDetailsError(false);
        break;

      case "price":
        setPriceError(false);
        break;

      case "images":
        setImageError(false);
        break;

      case "discount":
        setDiscountError(false);
        break;

      case "category":
        setCategoryError(false);
        break;
    }

    if (name === "images"){
      setValues({...values, [name]: [...values.images, ...e.target.files]});
    } else if (name === "colors"){
      let temp = [...values.colors];
      
      if (temp.indexOf(e.target.value) === -1){
        setValues({...values, [name]: [...values.colors, e.target.value]});  
      } else{
        console.log("already in");
      }
    } else {
      setValues({...values, [name]: e.target.value});
    }

    console.log(values);
  }

  async function deleteImage(index){
    let tempImageArray = [...values.images];
    tempImageArray.splice(index, 1);
    setValues({...values, images: tempImageArray});

    if (values.images.length <= 1){
      let elem = document.querySelector("input[type=file]");
      elem.value = "";
    }
  }

  async function uploadFiles(){
    const arr = [];

    for (let i = 0; i < values.images.length; i++){
      if (values.images[i].name){
        const params = {
          ACL: 'public-read',
          Body: values.images[i],
          Bucket: "homeandoffice",
          Key: `${v4()}-${values.images[i].name}`
        };

        const uploadedImage = await s3.upload(params).promise()
        
        arr.push({
          url: uploadedImage.Location,
          contentType: values.images[i].type,
          key: uploadedImage.Key
        })
      } else {
        arr.push(values.images[i]);
      }
    }

    return arr;
  }

  function validate(){
    let valid = true;

    if (!values.productName){
      valid = false;
      setNameError(true);
      setNameErrorMessage("Please enter a valid name")
    }

    if (!values.details){
      valid = false;
      setDetailsError(true);
      setDetailsErrorMessage("Details is required");
    }

    if (!values.details.length >= 10){
      valid = false;
      setDetailsError(true);
      setDetailsErrorMessage("Enter at least 15 characters");
    }


    if (!values.category){
      valid = false;
      setCategoryError(true);
      setCategoryErrorMessage("Please enter a category")
    }

    if (values.price <= 0){
      valid = false;
      setPriceError(true);
      setPriceErrorMessage("Please specify a price")
    }

    if (values.images.length <= 0){
      valid = false;
      setImageError(true);
      setImageErrorMessage("Please import an image")
    }

    return valid;
  }
  
  function handleSubmit(e){
    e.preventDefault();

    let valid = validate();
    
    if (valid){
      setLoading(true);

      async function saveItem(){
        try{

          let newImages = await uploadFiles();

          let response = await fetch(`${getUrl()}/items/update-item`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...values,
              images: newImages
            })
          })

          return await response.json();
        } catch(err){
          console.log(err);
        }
      }

      saveItem().then(data => {
        setLoading(false);
        console.log(data);
        onHide();
      });
    }
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Body>
        {loading && <div className="spinner-container">
          <div style={{marginTop: "0px"}}>
            <PuffLoader color={color} loading={loading} cssOverride={override} size={100}/>
          </div>
        </div>}
        <CardBody style={{overflow: "hidden"}}>
          <Form onSubmit={handleSubmit}>
            <Input 
              name="productName" 
              type="text"
              placeholder="Name"
              label="Name"
              required={true}
              onChange={handleChange}
              error={nameError}
              errorMessage={nameErrorMessage}
              defaultValue={product.productName}
            />

            <Input 
              name="productComment" 
              type="text"
              placeholder="Comment"
              label="Comment"
              required={true}
              onChange={handleChange}
              error={commentError}
              errorMessage={commentErrorMessage}
              defaultValue={product.productComment}
            />

            <Input 
              name="category" 
              type="select"
              placeholder="Category"
              label="Category"
              required={true}
              onChange={handleChange}
              error={categoryError}
              errorMessage={categoryErrorMessage}
              defaultValue={product.category}
            >
              <option value=""> - Category - </option>
              <option value="Furniture">Furniture</option>
              <option value="Lights">Lights</option>
              <option value="Smart Home Gadgets">Smart Home Gadgets</option>
              <option value="Home Security Gadgets">Home Security Gadgets</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Home Decoration">Home Decoration</option>
            </Input>

            <div className="my-2">
              {values.colors.map((color, i) => (
                <Badge 
                  key={i} 
                  index={i}
                  color={color} 
                  values={values}
                  setValues={setValues}
                />
              ))}
            </div>

            <Input 
              name="colors"
              type="select"
              placeholder="Color"
              label="Color"
              required={true}
              onChange={handleChange}
              error={colorsError}
              errorMessage={colorsErrorMessage}
            >
              <option value=""> - Color - </option>
              {colors.map((color, i) => (
                <option key={i} value={color}>{color}</option>
              ))}
            </Input>

            <Input 
              name="discount"
              type="select"
              placeholder="Discount"
              label="Discount"
              required={true}
              onChange={handleChange}
              error={discountError}
              errorMessage={discountErrorMessage}
              defaultValue={product.discount}
            >
              <option value={0}> - Discount - </option>
              <option value={5}>5%</option>
              <option value={10}>10%</option>
              <option value={15}>15%</option>
              <option value={20}>20%</option>
              <option value={25}>25%</option>
              <option value={30}>30%</option>
              <option value={35}>35%</option>
              <option value={40}>40%</option>
              <option value={45}>45%</option>
              <option value={50}>50%</option>
              <option value={55}>55%</option>
              <option value={60}>60%</option>
              <option value={65}>65%</option>
              <option value={70}>70%</option>
              <option value={75}>75%</option>
              <option value={80}>80%</option>
              <option value={85}>85%</option>
              <option value={90}>90%</option>
              <option value={95}>95%</option>
              <option value={100}>100%</option>
            </Input>

            <Input 
              name="price" 
              type="number"
              placeholder="Price"
              label="Price"
              required={true}
              error={priceError}
              onChange={handleChange}
              errorMessage={priceErrorMessage}
              defaultValue={product.price}
            />

            <Input 
              name="images" 
              type="file"
              placeholder="Image"
              label="Image"
              required={true}
              error={imageError}
              errorMessage={imageErrorMessage}
              onChange={handleChange}
              multiple={true}
            />

            {values.images.map((image, i) => (
              <div style={{display: "inline-block", position: "relative"}} key={i}>
                {image.name ? (
                  <>
                    <img src={window.URL.createObjectURL(image)} key={i} width={100} height={100} style={{margin: 10}}/>
                    <Button variant="danger" style={{position: "absolute", left: 10}} onClick={() => deleteImage(i)}>X</Button>
                  </>
                ) : (
                  <>
                    <img src={image.url} key={i} width={100} height={100} style={{margin: 10}}/>
                    <Button variant="danger" style={{position: "absolute", left: 10}} onClick={() => deleteImage(i)}>X</Button>
                  </>
                )}
              </div>
            ))}
            
            <Input 
              name="details" 
              type="textarea"
              placeholder="Details"
              label="Details"
              required={true}
              onChange={handleChange}
              error={detailsError}
              errorMessage={detailsErrorMessage}
              defaultValue={product.details}
            />
            
            <Input 
              name="dimensions" 
              type="textarea"
              placeholder="Dimensions"
              label="Dimensions"
              required={true}
              onChange={handleChange}
              error={dimensionsError}
              errorMessage={dimensionsErrorMessage}
              defaultValue={product.dimensions}
            />

            <Input 
              name="otherDetails" 
              type="textarea"
              placeholder="Other Details"
              label="Other Details"
              required={true}
              onChange={handleChange}
              error={othersError}
              errorMessage={othersErrorMessage}
              defaultValue={product.otherDetails}
            />

            <Button variant="danger" type="submit">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Modal.Body>
    </Modal>
  );
}

function Edit({product}) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)}>
        Edit
      </Button>

      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </>
  );
}

export default Edit;
