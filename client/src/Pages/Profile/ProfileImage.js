import { Cloudinary } from "@cloudinary/url-gen";
import { imageExists } from "../Utils/ApiUtil";
import React from "react";
import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export const ProfileImage = (props) => {
  const { netid, imageStyle, imageVersion } = props;
  const cld = new Cloudinary({
    cloud: { cloudName: process.env.REACT_APP_CLOUDINARY_NAME },
  });
  const hasImage = imageExists(netid, imageVersion); //load updated image with imageVersion
  const folder = process.env.REACT_APP_CLOUDINARY_FOLDER;
  const profileImage = imageVersion //if there is a version, include it in the url
    ? cld.image(folder + "/" + netid).setVersion(imageVersion)
    : cld.image(folder + "/" + netid);
  console.log("profileImage: ", profileImage);
  profileImage.format("jpg");
  
  return (
    <div>
      <AdvancedImage cldImg={profileImage} style={imageStyle} />
    </div>
  );
};
export const ProfileIcon = styled(AccountCircleIcon)({
  fontSize: "14vh",
  color: "#002140",
});