import AvatarUpload from "./imageUpload";
import React, { useState} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

const Imgupload = (props) => {

  const [logo, setLogo] = useState('')
  const [imageUpload,] = useState({});
  const [, setImg] = useState({});

  const handleImg = (e) => {
    if (e.target.files[0]) {
        setImg({
          src: URL.createObjectURL(e.target.files[0]),
          alt: e.target.files[0].name
        }); 
        setLogo(e.target.files[0]);
    }
  }
  const profileUpload = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "vcnzmcrh")
    let data = "";
    await Axios.post(
      "https://api.cloudinary.com/v1_1/vcnzmcrh/image/upload",
      formData).then((response) => {
        data = response.data["secure_url"];
      });
    return data;
  }
  const handleSubmit = async (e) => {
    imageUpload.image = logo;
    await profileUpload(logo);
  }
  return (
    <>
      <div>
      <h1 style = {{ textAlign: "center", color:"grey", marginTop:"90px" ,marginRight:"130px"}}>Profile Image Upload</h1>
          <div style = {{ marginLeft: "50px", marginTop: "50px"}}>
            <AvatarUpload imageUpload={handleImg} image={imageUpload.image} />
          </div>
          <div style={{ marginLeft: "10px", marginBottom: "50px", marginTop: "-135px", borderRadius: "25px", fontFamily: "arial"}}>
              <Button type="submit" color = "primary" onClick = {(e) => handleSubmit(e)}>
               submit
              </Button>
          </div>
      </div>
    </>
  );
}
export default Imgupload