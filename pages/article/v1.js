import Head from 'next/head';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Typewriter } from 'react-simple-typewriter'
import { Inter } from 'next/font/google'
// import Swal from 'sweetalert2';
// import { useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import Post from '@/components/Post';
// import Loading from '@/components/Loading';

// const PER_PAGE = 3;
const INTER = Inter({ subsets: ['latin'] })

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((article) => (
                    <Post key={article.pID} data={article} />
                ))}
        </>
    );
}

export default function Page() {

    // const [Articles, setArticles] = useState(null);
    // const [error, setError] = useState(null);
    // const [itemOffset, setItemOffset] = useState(0);
    // const [showPost, setShowPost] = useState(true);

    // const endOffset = itemOffset + PER_PAGE;

    // const currentItems = Articles?.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(Articles?.length / PER_PAGE);

    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * PER_PAGE) % Articles.length;
    //     window?.scrollTo({ top: 0, behavior: 'smooth' });
    //     setShowPost(false)
    //     setTimeout(() => {
    //         setItemOffset(newOffset);
    //         setShowPost(true)
    //     }, 1500)
    // };

    // useEffect(() => {
    //     (async () => {
    //         const toastID = toast.loading("Please wait...")
    //         const res = await fetch('/api/article');
    //         if (res.status === 200) {
    //             toast.update(toastID, { render: "Data is fetched successfully!", type: "success", isLoading: false, autoClose: 1500, hideProgressBar: true });
    //             const codes = await res.json();
    //             const articles = await Promise.all(codes.flatMap(async (gID) => {
    //                 try {
    //                     const [gistResponse, commentsResponse] = await Promise.all([
    //                         fetch(`https://api.github.com/gists/${gID}`),
    //                         fetch(`https://api.github.com/gists/${gID}/comments`)
    //                     ]);
    //                     if (gistResponse.status !== 200) throw Error(gistResponse.statusText)
    //                     setError(null);
    //                     const { owner, ...gistData } = await gistResponse.json();
    //                     const { login, avatar_url } = owner ?? {};
    //                     const commentsData = await commentsResponse.json();
    //                     const comments = commentsData?.map(({ user, ...comment }) => ({
    //                         cID: comment.id,
    //                         commenter: user.login,
    //                         image: user.avatar_url,
    //                         ...comment
    //                     })) ?? [];
    //                     return {
    //                         pID: gistData.id,
    //                         created: gistData.created_at,
    //                         updated: gistData.updated_at,
    //                         headline: gistData.description,
    //                         writer: login,
    //                         image: avatar_url,
    //                         comments
    //                     };
    //                 } catch (error) {
    //                     console.log('🔥🔥🔥🔥🔥🔥', error.message);
    //                     setTimeout(() => {
    //                         toast.update(toastID, { render: "Oops,technical difficulties!", type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
    //                         Swal.fire({
    //                             icon: 'warning',
    //                             title: 'Oops...',
    //                             text: "Oops, it seems like Github API is currently experiencing some technical difficulties!"
    //                         })
    //                             .finally(() => {
    //                                 setError("Sorry, we're unable to display this page right now. Please try again later")
    //                             })
    //                     }, 1500)
    //                 }
    //             }));
    //             setArticles(articles.filter(Boolean));
    //         }
    //         else {
    //             console.log('🔥🔥🔥🔥🔥🔥', error.message);
    //             setTimeout(() => {
    //                 toast.update(toastID, { render: "Oops,technical difficulties!", type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
    //                 Swal.fire({
    //                     icon: 'warning',
    //                     title: 'Oops...',
    //                     text: "Oops, it seems like Mongodb cloud function is currently experiencing some technical difficulties!"
    //                 })
    //                     .finally(() => {
    //                         setError("Sorry, we're unable to display this page right now. Please try again later");
    //                     })
    //             }, 1500)
    //         }
    //     })()

    // }, []);

    // const styles = {
    //     display: "inline"
    // }

    useEffect(() => {
        const toastID = toast.warn("Deprecated⛔", { autoClose: 1500, hideProgressBar: true })
    }, [])

    return (
        <>
            <ToastContainer />
            <Head>
                <title>DevCup | ArticleV1</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`w3-content ${INTER.className}`} style={{ maxWidth: 1400 }}>

                <div className='w3-center w3-text-red w3-large'>
                    <Typewriter
                        words={["Due to technical🧎🏼, this page is currently unavailable 🚫"]}
                        typeSpeed={50}
                        stopBlinkinOnComplete
                        cursor="|"
                    />
                </div>

                {/* <div className="w3-col l8 s12">
                    {
                        Articles &&
                        <>
                            {
                                showPost && <Items currentItems={currentItems} />
                            }
                            {
                                !showPost &&
                                <>
                                    <Loading />
                                    <div style={{ padding: '500px 0px' }}></div>
                                </>
                            }
                            <div className="w3-center">
                                <ReactPaginate
                                    breakLabel="..."
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    renderOnZeroPageCount={null}
                                    nextLabel="▶"
                                    previousLabel="◀"
                                    className="w3-bar"
                                    activeClassName="w3-inline"
                                    activeLinkClassName="w3-button w3-round w3-gray"
                                    previousClassName="w3-inline"
                                    previousLinkClassName="w3-button w3-light-gray w3-round"
                                    nextClassName="w3-inline"
                                    nextLinkClassName="w3-button w3-light-gray w3-round"
                                    pageClassName="w3-inline"
                                    pageLinkClassName="w3-button w3-round"
                                />
                            </div>

                        </>
                    }
                    {
                        error &&
                        <div className='w3-center w3-padding-64 w3-text-red'>
                            {error}
                        </div>
                    }
                    {
                        !Articles && <Loading />
                    }
                    {
                        Articles && Articles.every(element => element === undefined) && <div className='w3-padding'></div>
                    }
                </div> */}

                {/* <div className="w3-col l4">
                    <div className="w3-card w3-round-large w3-margin-small">
                        <img
                            src="/devcup-logo.png"
                            style={{ width: "100%" }}
                        />
                        <div className="w3-container w3-white">
                            <h4>
                                <b>Welcome to DevCup!</b>
                            </h4>
                            <p>
                                Our blog is dedicated to providing valuable insights and resources for developers who want to stay up-to-date with the latest industry trends and technologies. We understand that developers are always on the go, which is why we offer a collection of informative and concise articles that you can read while enjoying a cup of coffee. From coding tutorials and best practices to career advice and interviews with top developers, we've got you covered with content that's easy to consume and apply to your work. Join the DevCup community today to elevate your skills and stay ahead in your career.
                            </p>
                        </div>
                    </div>
                </div> */}


            </main>
        </>
    )
}