import React, { Suspense } from "react";
import {imgCache} from '../utils/helpers'

const OriImg = ({ src, alt, ...rest }: { src: string, alt?: string}) => {
  imgCache.read(src);

  return <img src={src} alt={alt} {...rest} />;
};

const LazyLoadImg = ({ src, alt = "No name", ...rest }: { src: string, alt?: string}) => {
  const placeholder = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  return (
    <Suspense fallback={<img src={placeholder} alt={alt} />}>
      <OriImg src={src} alt={alt} {...rest} />
    </Suspense>
  );
};

export default LazyLoadImg
