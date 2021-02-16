import React, { Suspense } from "react";
import styled from 'styled-components'
import {imgCache} from '../utils/helpers'

const StyledDiv = styled.div<{img: string}>`
  background-image: ${p => p.img && `url(${p.img})`};
`

const OriImg = ({ img, children, ...rest }: { img: string, children?: any }) => {
  imgCache.read(img);

  return <StyledDiv img={img} {...rest} >{children}</StyledDiv>;
};

const LazyBg = ({ img, children, ...rest }: { img: string, children?: any }) => {
  const placeholder = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  return (
    <Suspense fallback={<StyledDiv img={placeholder} {...rest} >{children}</StyledDiv>}>
      <OriImg img={img} {...rest} >{children}</OriImg>
    </Suspense>
  );
};

export default LazyBg
