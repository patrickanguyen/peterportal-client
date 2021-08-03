import React, { FC, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import SubReview from './SubReview';
import ReviewForm from '../ReviewForm/ReviewForm';
import './Review.scss'

import { CourseData, ReviewData } from 'src/types/types';

export interface ReviewProps extends CourseData {
}

const Review: FC<ReviewProps> = (props) => {
    const [reviewData, setReviewData] = useState<ReviewData[]>(null!);
    const [openForm, setOpenForm] = useState(false);

    const getReviews = async () => {
        axios.get(`/reviews`, {
            params: {
                courseID: props.id
            }
        })
            .then((res: AxiosResponse<ReviewData[]>) => {
                const data = res.data.filter((review) => review !== null)
                setReviewData(data);
            });
    }

    useEffect(() => {
        getReviews();
    }, []);

    const openReviewForm = () => {
        setOpenForm(true);
        document.body.style.overflow = 'hidden';
    }
    const closeForm = () => {
        setOpenForm(false);
        document.body.style.overflow = 'visible';
    }

    if (!reviewData) {
        return <p>Loading reviews..</p>;
    } else {
        return (
            <>
                <div className='reviews'>
                    {reviewData.map((review, i) => {
                        if (review !== null) return (<SubReview review={review} key={i} />)
                    })}
                    <button type='button' className='add-review-btn' onClick={openReviewForm}>+ Add Review</button>
                </div>
                {openForm ? (
                    <>
                        <div className='blur-bg' onClick={closeForm} />
                        <ReviewForm {...props} />
                    </>
                ) : null}
            </>
        )
    }
}

export default Review;