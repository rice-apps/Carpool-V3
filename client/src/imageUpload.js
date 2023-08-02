import React, {useState, createRef} from "react";
import { Avatar, Button as MuiButton } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete'
import UploadIcon from '@mui/icons-material/Upload'
import { spacing } from "@material-ui/system";
import styled from "styled-components";

const Button = styled(MuiButton)(spacing);
const CenteredContent = styled.div
    `text-algin:center;`;

const BigAvatar = styled(Avatar)
    `margin-left: 40% ;
    border: 1px solid grey;
    margin-top: 10%;
    box-shadow: 1px 1px 15px -5px black;`;


const AvatarUpload = (props) => {
    const [image, _setImage] = useState();
    const inputFileRef = createRef();
    const cleanup = () => {
        URL.revokeObjectURL(image && props.image);
        inputFileRef.current.value = null;
    };
    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
    };
    const handleOnChange = (event) => {
        const newImage = event.target.files[0];
        if (newImage) {
            setImage(URL.createObjectURL(newImage));
        }
        props.imageUpload(event)
    };

    return (
        <CenteredContent>
            <BigAvatar
            alt="Avatar"
            src = {image}
            style = {{padding: "25px", width: "110px", borderRadius: "50%", height: "100px", marginLeft: "-17.5px"}}
            />
            <input
                ref = {inputFileRef}
                accept = "image/*"
                hidden
                id = "avatar-image-upload"
                type = "file"
                onChange = {handleOnChange}
            />
            <label htmlFor = "avatar-image-upload">
                <Button
                    color = "primary"
                    component = "span"
                    style = {{ marginBottom: "100px", width: "130px", borderRadius: "25px", fontFamily: "arial", textAlign: "center", padding: "0px", marginLeft:"-25px" }}
                >
                    {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
                    {image ? "Uploaded" : "Upload"}
                </Button>
            </label>
        </CenteredContent>
    );
};

export default AvatarUpload;