
import React, {useState, useEffect} from "react";
import {
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import {Form, Button, Card} from "react-bootstrap";
import {v4} from "uuid";
import PuffLoader from "react-spinners/PuffLoader";
import tempColors from "css-color-names";
import Input from "../components/Input/InputField";
import DeleteModal from "../components/Delete/DeleteModal";
import Badge from "../components/Badge/Badge";
import AWS from "aws-sdk";

import {getUrl} from "../../../helper/url-helper";
import AdminProductCard from "../components/AdminProductCard";

let reader = new FileReader();
const colors = [];

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

for (const [key, value] of Object.entries(tempColors)) {
  colors.push(key);
}

function Shop() {
  const [values, setValues] = useState({
    productName: "",
    details: "",
    category: "",
    price: 0,
    stars: [],
    discount: 0,
    images: [],
    colors: [],
    productComment: ""
  });
  const [products, setProducts] = useState([]);
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function getItems(){
      try{
        let response = await fetch(`${getUrl()}/items/items`, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        })

        let rs = await response.json();
        console.log(rs)

        if (rs.length){
          setProducts(rs);
        } else {
          console.log(rs);
        }
      } catch(err){
        console.log(err);
      }
    }  
    
    getItems().then(d => {
      
    });
  }, [])

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
  }

  function deleteImage(index){
    let tempImageArray = [...values.images];
    tempImageArray.splice(index, 1);
    setValues({...values, images: tempImageArray});

    if (values.images.length <= 1){
      let elem = document.querySelector("input[type=file]");
      elem.value = "";
    }
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

  async function uploadFiles(){
    const arr = [];

    for (let i = 0; i < values.images.length; i++){
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
    }

    return arr;
  }
  
  function handleSubmit(e){
    e.preventDefault();

    let valid = validate();

    console.log(values);
    
    if (valid){
      setLoading(true);

      async function saveItem(){
        try{
          let newImages = await uploadFiles();

          let response = await fetch(`${getUrl()}/items/add-item`, {
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

          setProducts([...products, {
            ...values,
            images: newImages
          }]);

          return await response.json();
        } catch(err){
          console.log(err);
        }
      }

      saveItem().then(data => {
        setLoading(false);
        console.log(data);
      });
    }
  }

  function deleteProduct(index, cb){
    let tempArray = [...products];
    tempArray.splice(index, 1);
    setProducts(tempArray);

    cb();
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <div className="admin-sub-card">
              {loading && <div className="spinner-container">
                <div style={{marginTop: "200px"}}>
                  <PuffLoader color={color} loading={loading} cssOverride={override} size={100}/>
                </div>
              </div>}
              <CardHeader>
                <CardTitle tag="h4">Add Item</CardTitle>
              </CardHeader>
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
                      <img src={window.URL.createObjectURL(image)} key={i} width={100} height={100} style={{margin: 10}}/>
                      <Button variant="danger" style={{position: "absolute", left: 10}} onClick={() => deleteImage(i)}>X</Button>
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
                  />

                  <Button variant="danger" type="submit" onSubmit={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="admin-sub-card">
              <CardHeader>
                <CardTitle tag="h4">Items Table</CardTitle>
              </CardHeader>
              <CardBody style={{overflow: "hidden"}}>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                  {products.map((product, i) => (
                    <div style={{display: "inline-block", width: "14rem", marginRight: 100}} key={i}>
                      <AdminProductCard product={product} index={i} deleteProduct={deleteProduct}/>
                    </div>
                  ))}
                </div>
              </CardBody>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Shop;
