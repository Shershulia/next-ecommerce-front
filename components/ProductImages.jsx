import React, {useState} from 'react';
import styled from "styled-components";
const Image = styled.img`
    max-width: 100%;
      max-height: 100%;
      border-radius: 3px;
    `;
const BigImage = styled.img`
    max-width: 100%;
    height: 200px;
`;
const ImageButtons = styled.div`
    display: flex;
    gap:10px;
      margin-top: 10px;
    `;
const ImageButton = styled.div`
  border: 2px solid ${props => (props.active ? '#ccc' : 'transparent')};
  opacity: ${props => (props.active ? '1' : '0.7')};
  height: 45px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
    `;

const BigImageWrapper = styled.div`
  text-align: center;
`;
const ProductImages = ({images}) => {
    const [activeImage,setActiveImage] = useState(images?.[0]);
    return (
        <>
            <BigImageWrapper>
                <BigImage src={activeImage}/>
            </BigImageWrapper>
            <ImageButtons>
                {images.map(image=>(
                    <ImageButton active={image===activeImage ? 1 : 0}
                                 onClick={()=>{setActiveImage(image);}}
                    key={image}>
                        <Image  src={image} alt={'image'}/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
};

export default ProductImages;