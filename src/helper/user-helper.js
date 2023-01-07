
export function getUser(){
  let admin = localStorage.getItem("admin");

  if (admin){
    return admin;
  } else {
    return undefined;
  }
}

export function saveUser(user){
  localStorage.setItem("admin", JSON.stringify(user));
}
