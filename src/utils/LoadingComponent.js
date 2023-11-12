import {React} from 'react'
import  RiseLoader  from 'react-spinners/CircleLoader';
import { css } from "@emotion/react";
//css 
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

  
const LoadingComponent = () => {

  return <RiseLoader color='red' loading={true} css={override} ></RiseLoader>
}
export default LoadingComponent;
