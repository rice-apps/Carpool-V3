import Axios from "axios";
import { gql } from "@apollo/client";

//cloudinary signature
export const GET_SIGNATURE = gql`
  query getSignature($publicId: String, $timestamp: Int, $folder: String) {
    signature(publicId: $publicId, timestamp: $timestamp, folder: $folder) {
      signature
      timestamp
      cloudname
      folder
      apikey
    }
  }
`;

export const GET_USER = gql`
  query GetUserInfo($netID: String) {
    userOne(filter: { netid: $netID }) {
      _id
      firstName
      lastName
      netid
      phone
      payment
      college
      imageVersion
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $payment: JSON!
    $college: String!
    $imageVersion: Float
  ) {
    userUpdateOne(
      record: {
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        payment: $payment
        college: $college
        imageVersion: $imageVersion
      }
    ) {
      record {
        _id
        firstName
        lastName
        phone
        payment
        college
        imageVersion
      }
    }
  }
`;

//async function to upload image and return version id
export const toCloudinary = async (image, netId, signature) => {
  const url =
    "https://api.cloudinary.com/v1_1/" +
    process.env.REACT_APP_CLOUDINARY_NAME +
    "/auto/upload"; //auto-upload

  if (image) {
    //if there is a new image to upload
    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", signature.apikey);
    formData.append("timestamp", signature.timestamp);
    formData.append("folder", signature.folder);
    formData.append("signature", signature.signature);
    formData.append("public_id", netId);
    formData.append("overwrite", true);

    try {
      const resp = await Axios.post(url, formData);
      return resp.data.version; //version id (imageVersion)
    } catch (err) {
      console.log(err);
    }
  }
};

//returns True if the user already has a profile pic
export const imageExists = (netId, imageVersion) => {
  if (imageVersion) imageVersion = "v" + imageVersion + "/";
  else imageVersion = "";
  console.log("cloudinary name: ", process.env.REACT_APP_CLOUDINARY_NAME);
  const imageURL =
    "https://res.cloudinary.com/" +
    process.env.REACT_APP_CLOUDINARY_NAME +
    "/image/upload/" +
    imageVersion +
    process.env.REACT_APP_CLOUDINARY_FOLDER +
    "/" +
    netId +
    ".jpg";
  console.log("imageURL", imageURL);
  const http = new XMLHttpRequest();
  http.open("HEAD", imageURL, false);
  // http.send(); //error
  return http.status !== 404;
};
