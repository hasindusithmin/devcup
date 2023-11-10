import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Loading from '@/components/Loading';

export default function Post() {
    const [URLS, setURLS] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 5;
    const pagesVisited = pageNumber * postsPerPage;

    useEffect(() => {
        axios
            .get(
                'https://script.google.com/macros/s/AKfycbx0h3dNz4DtMN-c1EYYkq79l2OC31U8tZdoLzuhse8HNB2jF7yMCQ6S5aFl3T-H119R/exec'
            )
            .then((res) => {
                const unique = [...new Set(res.data)];
                setURLS(unique);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const displayPosts = URLS
        ? URLS.slice(pagesVisited, pagesVisited + postsPerPage).map(({ URN }) => (
            <iframe
                key={URN}
                src={URN}
                height={500}
                width="100%"
                frameBorder={0}
                allowFullScreen=""
                title="Embedded post"
                style={{
                    marginBottom: '20px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            />
        ))
        : null;

    const pageCount = Math.ceil(URLS ? URLS.length / postsPerPage : 0);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="w3-content w3-center">
            {URLS ?
                <>
                    {displayPosts}
                    < ReactPaginate
                        previousLabel="&laquo;"
                        nextLabel="&raquo;"
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName='w3-bar w3-large'
                        previousClassName='w3-btn'
                        pageClassName='w3-btn'
                        nextClassName='w3-btn'
                        activeClassName='w3-btn w3-green'
                    />
                </>
                :
                <Loading />
            }
        </div>
    );
}
