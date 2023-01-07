
export function getUrl(){
  if (process.env.NODE_ENV === "development"){
    return "https://gjmeyxm8e5.execute-api.us-east-1.amazonaws.com/latest";
  } else {
    return "https://gjmeyxm8e5.execute-api.us-east-1.amazonaws.com/latest";
  }
}
