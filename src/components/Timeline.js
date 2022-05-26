import React from "react";
// import Skeleton from 'react-loading-skeleton';
import { Instagram } from "react-content-loader";

import usePhotos from "../hooks/use-photos";
import Post from "./post";

const Timeline = () => {
  const { photos } = usePhotos();
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {
            /* {<Skeleton  count={4} width={640} height={600} />} */
            <Instagram />
          }
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2 ">Follow peoples to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
