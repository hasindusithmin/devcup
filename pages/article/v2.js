import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Inter } from 'next/font/google'
import Post from '@/components/Post';
import Loading from '@/components/Loading';

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

export default function V2() {
    const [total, setTotal] = useState(0);
    const [Articles, setArticles] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const perPage = 3;

    useEffect(() => {
        (async () => {
            const toastID = toast.loading("⏳Please wait...")
            const res = await fetch(`/api/article/v2/${currentPage + 1}`)
            if (res.status === 200) {
                const { total, codes } = await res.json();
                setTotal(total);
                setError(null);
                const articles = await Promise.all(codes.flatMap(async (gID) => {
                    const [gistResponse, commentsResponse] = await Promise.all([
                        fetch(`https://api.github.com/gists/${gID}`),
                        fetch(`https://api.github.com/gists/${gID}/comments`)
                    ]);
                    if (gistResponse.status !== 200) return
                    const { owner, ...gistData } = await gistResponse.json();
                    const { login, avatar_url } = owner ?? {};
                    const commentsData = await commentsResponse.json();
                    const comments = commentsData?.map(({ user, ...comment }) => ({
                        cID: comment.id,
                        commenter: user.login,
                        image: user.avatar_url,
                        ...comment
                    })) ?? [];
                    return {
                        pID: gistData.id,
                        created: gistData.created_at,
                        updated: gistData.updated_at,
                        headline: gistData.description,
                        writer: login,
                        image: avatar_url,
                        comments
                    };
                }));
                toast.update(toastID, { render: "Successfull!", type: "success", isLoading: false, autoClose: 1500, hideProgressBar: true });
                setArticles(articles.filter(Boolean));
            }
            else {
                console.log('⚠️technical difficulties');
                setTimeout(() => {
                    toast.update(toastID, { render: "😞Oops,technical difficulties!", type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: "😞Oops, it seems like mongodb cloud function is currently experiencing 🚧 some technical difficulties!"
                    })
                        .finally(() => {
                            setArticles([]);
                            setError("🥺Sorry, we're unable to display this page right now. ⏳ Please try again later");
                        })
                }, 1500)
            }
        })()
    }, [currentPage]);

    const handlePageClick = (selectedPage) => {
        window?.scrollTo({ top: 0, behavior: 'smooth' })
        setCurrentPage(selectedPage.selected);
    };

    return (
        <>
            <ToastContainer />
            <Head>
                <title>DevCup | Article</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={`w3-content ${INTER.className}`} style={{ maxWidth: 1400 }}>

                <div className="w3-col l8 s12">
                    {
                        Articles && Articles.length > 0 &&
                        <>
                            {
                                <Items currentItems={Articles} />
                            }
                            <div className="w3-center">
                                <ReactPaginate
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={Math.ceil(total / perPage)}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
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
                        <div className='w3-center w3-padding-64 w3-text-red w3-large'>
                            {error}
                        </div>
                    }
                    {
                        !Articles && <Loading />
                    }

                </div>

                <div className="w3-col l4 w3-hide-small">
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
                </div>

            </main>

        </>
    );
}
