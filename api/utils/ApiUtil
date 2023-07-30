import Axios from "axios";

export const uploadImage = (image, netId) => {
  const url =
    "https://api.cloudinary.com/v1_1/" +
    process.env.REACT_APP_CLOUDINARY_NAME +
    "/image/upload";

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_FOLDER);
  formData.append("public_id", netId);
  Axios.post(url, formData)
    .then((response) => {
      console.log("RESPONSE", response);
    })
    .catch((error) => {
      console.error("upload image error", error);
      //TODO: addToast
    });
};

export const imageExists = (netId) => {
  console.log(process.env.REACT_APP_CLOUDINARY_NAME);
  const imageURL =
    "https://res.cloudinary.com/" +
    process.env.REACT_APP_CLOUDINARY_NAME +
    "/image/upload/" +
    netId +
    ".jpg";

  const http = new XMLHttpRequest();
  http.open("HEAD", imageURL, false);
  http.send();
  return http.status !== 404;
};