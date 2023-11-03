import { forwardRef, useRef } from "react";
import "./NFT.css";

const NFT = (props) => {
  const NFTRef = useRef();
  const onSelectHandler = ()=>{
    props.onClick(props);
  }
  return (
    <>
      <div onClick={onSelectHandler} className="card my-3 mx-3">
        <img src={`http://localhost:3000/images/${props.dest}`} alt="nft-img" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.desc}</p>
        </div>
      </div>
    </>
  );
};

export default NFT;
