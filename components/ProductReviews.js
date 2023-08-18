import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Input from "@/components/Input";
import {PrimaryBtn, Spinner, StarsRating, TextArea, WhiteBox} from "@/components/index";
import axios from "axios";

const Title = styled.h2`
font-size: 1.2rem;
  margin-bottom: 5px;
`
const Subtitle = styled.h3`
  margin-top: 5px;
font-size: 1rem;
`
const ColsWrapper = styled.div`
  display: grid;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  grid-template-columns: 1fr;

  gap:40px;
  margin-bottom: 40px;
`;
const ReviewWrapper = styled.div`
    margin-bottom: 10px;
  border-top: 1px solid #ddd;
  padding: 10px 0;
    h3{
      margin:3px 0;
      font-size: 1rem;
      color:#333;
      font-weight: normal;
    }
  p{
    margin: 0;
    font-size: .8rem;
    line-height: 1rem;
    color:#555;
  }
  
`;
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time{
    font-size: 12px;
    color: #aaa;
    
  }
`
 const ProductReviews = ({product}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription]= useState('');
    const [stars, setStars] = useState(0);
    const [reviews,setReviews] = useState([]);
    const [reviewsLoading,setReviewsLoading] = useState(false);

    const submitReview = () =>{
        const data = {title,description,stars,product:product._id};
        axios.post('/api/reviews',data).then(res=>{
            alert('ok');
            setTitle('');
            setDescription('');
            setStars(0);
            loadReviews();
        })
    }
    useEffect(()=>{
        loadReviews();
    },[])

     function loadReviews(){
         setReviewsLoading(true);
         axios.get('/api/reviews?product='+product._id).then(res=>{
             setReviews(res.data);
             setReviewsLoading(false);

         })
     }
    return (
        <div>
            <Title>Reviews</Title>
            <ColsWrapper>
                <div>
                    <WhiteBox>
                        <Subtitle>Add review</Subtitle>
                        <div>
                            <StarsRating onChange={setStars}/>
                        </div>
                        <Input value={title} onChange={ev=>setTitle(ev.target.value)} placeholder={'Title'}></Input>
                        <TextArea value={description} onChange={ev=>setDescription(ev.target.value)} placeholder={'Was it good?'}/>
                        <div>
                            <PrimaryBtn primary={1} onClick={submitReview}>Submit your review</PrimaryBtn>
                        </div>
                    </WhiteBox>
                </div>

                <div>
                    <WhiteBox>
                        <Subtitle>All reviews</Subtitle>
                        {reviewsLoading && (<Spinner fullwidth={true}/>)}
                        {reviews.length===0 && !reviewsLoading && (<p>No reviews :(</p>)}
                        {reviews.length>0 && reviews.map(review=>(
                            <ReviewWrapper key={review._id}>
                                <ReviewHeader>
                                        <StarsRating disabled={true} size={'sm'} defaultHowMany={review.stars}></StarsRating>
                                        <time>{(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                                </ReviewHeader>
                                <h3>
                                    {review.title}
                                </h3>
                                <p>
                                    {review.description}
                                </p>
                            </ReviewWrapper>
                        ))}
                    </WhiteBox>
                </div>
            </ColsWrapper>

        </div>
    );
};

export default ProductReviews;