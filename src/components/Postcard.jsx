import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
function Postcard({ $id, title, featuredImg }) {//&id = appwrite 
  return (
    <Link to={`/post/${$id}`}>
      <div>
        <div>
          <img
            src={appwriteService.getFilePreview(featuredImg)}
            alt={title}
          ></img>
        </div>

        <h1>{title}</h1>
      </div>
    </Link>
  );
}
export default Postcard;
