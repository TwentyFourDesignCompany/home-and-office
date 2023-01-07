
export function addItem(values){
  let items = localStorage.getItem("cart");

  if (items){
    let tempItems = JSON.parse(items);
    let index;

    let item = tempItems.find((val, i) => {
      if (val.item._id === values._id){
        index = i;
      }
      return val.item._id === values._id;
    })

    if (!item){
      tempItems.push({item: values, quantity: 1});
    } else {
      tempItems[index].quantity = tempItems[index].quantity + 1;
    }

    localStorage.setItem("cart", JSON.stringify(tempItems));
    console.log(tempItems);

  } else {
    localStorage.setItem("cart", JSON.stringify([{item: values, quantity: 1}]));
  }
}

export function getItems(){
  if (localStorage.getItem("cart")){
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
}

export function changeQuantity(operation, id){
  let tempItems = JSON.parse(localStorage.getItem("cart"));
  let index;

  if (operation === "add"){
    let item = tempItems.find((val, i) => {
      if (val.item._id === id){
        index = i;
      }
      return val.item._id === id;
    })

    tempItems[index].quantity = tempItems[index].quantity + 1;
    localStorage.setItem("cart", JSON.stringify(tempItems));
  } else {
    let item = tempItems.find((val, i) => {
      if (val.item._id === id){
        index = i;
      }
      return val.item._id === id;
    })

    tempItems[index].quantity = tempItems[index].quantity - 1;
    localStorage.setItem("cart", JSON.stringify(tempItems));
  }
}

export function deleteFromCart(index){
  let tempItems = JSON.parse(localStorage.getItem("cart"));

  tempItems.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(tempItems));
  return tempItems;
}
