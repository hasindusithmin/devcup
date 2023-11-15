import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from '@/components/Loading';
import axios from 'axios';
import { extractContent, generateQuestions, pythonAPI } from '@/js/requests';
import Swal from 'sweetalert2';
import showdown from 'showdown';

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

    const copyToClipboard = (event) => {
        URLS.forEach(({ src }) => {
            if (document.getElementById(src)) {
                document.getElementById(src + '_loading').style.display = 'none'
                document.getElementById(src + '_done').style.display = 'none'
                document.getElementById(src + '_info').style.display = 'none'
            }
        })
        let parentID = event.target.id;
        if (parentID.endsWith("_done")) {
            parentID = parentID.replace("_done", "")
        }
        if (parentID.endsWith("_info")) {
            parentID = parentID.replace("_info", "")
        }
        document.getElementById(parentID).disabled = true
        document.getElementById(parentID + '_loading').style.display = 'inline'
        document.getElementById(parentID + '_done').style.display = 'none'
        extractContent(parentID, function (result, error) {
            document.getElementById(parentID + '_loading').style.display = 'none'
            document.getElementById(parentID).disabled = false
            if (error) {
                document.getElementById(parentID + '_info').title = error
                document.getElementById(parentID + '_info').style.display = 'inline'
            }
            else {
                navigator.clipboard.writeText(result.content);
                document.getElementById(parentID + '_done').style.display = 'inline'
            }
        })
    }

    const [loading, setLoading] = useState(false);
    let post = null;

    const openModal = (inputOptions) => {
        Swal.fire({
            title: "Common Questions",
            customClass: {
                title:"w3-large",
                confirmButton:"w3-button w3-green w3-round-xlarge"
            },
            input: "select",
            inputPlaceholder: "Select a question",
            inputOptions,
            confirmButtonText: "Find Solution",
            showCloseButton: true,
            showLoaderOnConfirm: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to choose a question!";
                }
            },
            preConfirm: (value) => {
                return fetch(`${pythonAPI}/answer`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ post, question: value })
                })
                    .then(async (response) => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        const { answer } = await response.json()
                        const converter = new showdown.Converter()
                        Swal.fire({
                            title: value,
                            html: converter.makeHtml(answer),
                            showConfirmButton: true,
                            confirmButtonText: "Return to Questions",
                            showCloseButton: true,
                            customClass: {
                                title:"w3-large",
                                htmlContainer: "w3-justify w3-padding scrollable-container",
                                confirmButton: "w3-button w3-green w3-round-xlarge"
                            },
                            preConfirm: () => {
                                openModal(inputOptions)
                            }
                        })
                    })
                    .catch(error => {
                        Swal.showValidationMessage(error)
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    const getQuestions = (src) => {
        setLoading(true);
        const inputOptions = new Promise((resolve) => {
            generateQuestions(src, function (result, error) {
                setLoading(false)
                if (result) {
                    post = result['post']
                    const { questions } = result;
                    const questionsArray = questions.split("\n").filter(question => question != '').map(question => question.trim())
                    const questionsObject = {}
                    for (const question of questionsArray) {
                        questionsObject[question] = question;
                    }
                    resolve(questionsObject)
                }
            })
        });
        openModal(inputOptions)
    }

    const displayPosts = URLS
        ? URLS.slice(pagesVisited, pagesVisited + postsPerPage).map(({ src, height }) => (
            <div className='w3-padding'>
                <div className='w3-card'>
                    <iframe
                        key={src}
                        src={src}
                        height={height}
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
                    <div style={{ paddingBottom: 16 }}>
                        <button id={src} className='w3-button w3-blue w3-round' onClick={copyToClipboard}>
                            <i id={src + '_loading'} className="fa fa-clock-o" style={{ display: "none" }}></i>
                            <i id={src + '_done'} className="fa fa-check" style={{ display: "none" }}></i>
                            <i id={src + '_info'} className="fa fa-question-circle" style={{ display: "none" }}></i>
                            &nbsp;Copy to clipboard
                        </button>
                        &nbsp;
                        <button className='w3-button w3-green w3-round' onClick={() => { getQuestions(src) }} disabled={loading}>
                            Explore Common Questions
                        </button>
                    </div>
                </div>
            </div>
        ))
        : null;

    const pageCount = Math.ceil(URLS ? URLS.length / postsPerPage : 0);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const getVisiblePageNumbers = () => {
        const totalPageNumbers = 3;
        const pageNumbers = [];
        let startPage, endPage;

        if (pageCount <= totalPageNumbers) {
            // Display all page numbers if total is less than or equal to the desired number
            startPage = 0;
            endPage = pageCount - 1;
        } else {
            // Calculate start and end page numbers to display
            if (pageNumber <= Math.floor(totalPageNumbers / 2)) {
                startPage = 0;
                endPage = totalPageNumbers - 1;
            } else if (pageNumber + Math.floor(totalPageNumbers / 2) >= pageCount) {
                startPage = pageCount - totalPageNumbers;
                endPage = pageCount - 1;
            } else {
                startPage = pageNumber - Math.floor(totalPageNumbers / 2);
                endPage = pageNumber + Math.floor(totalPageNumbers / 2);
            }
        }

        // Adjust the startPage and endPage to ensure exactly 5 buttons are shown
        const additionalPages = totalPageNumbers - (endPage - startPage + 1);
        if (additionalPages > 0) {
            if (startPage === 0) {
                endPage += additionalPages;
            } else {
                startPage -= additionalPages;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };


    return (
        <div className="w3-content w3-center">
            {URLS ? (
                <>
                    {displayPosts}
                    <ReactPaginate
                        previousLabel="&laquo;"
                        nextLabel="&raquo;"
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName='w3-bar w3-large'
                        previousClassName='w3-btn'
                        pageClassName='w3-btn'
                        nextClassName='w3-btn'
                        activeClassName='w3-btn w3-green'
                        breakLabel={'...'}
                        breakClassName={'w3-btn w3-disabled'}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        initialPage={pageNumber}
                        disableInitialCallback={true}
                        forcePage={pageNumber}
                        pages={getVisiblePageNumbers()}
                    />
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}




