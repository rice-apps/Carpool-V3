import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components'

const LoadingDiv = ({height}) => {
   if (!height) {
    height = '15vh'
  }
  const LoadingContainer = styled.div`
    display: flex;
    width: 100%;
    height: ${height};
    justify-content: center;
    align-items: center;
  `
  return(
    <LoadingContainer>
      <ClipLoader />
    </LoadingContainer>
  )
}

export default LoadingDiv