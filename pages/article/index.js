import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { Inter } from 'next/font/google'
import Post from '@/components/Post';
import Loading from '@/components/Loading';

const PER_PAGE = 3;
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

    const navigate = useRouter()
    const [Articles, setArticles] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [showPost, setShowPost] = useState(true);

    const endOffset = itemOffset + PER_PAGE;

    const currentItems = Articles?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(Articles?.length / PER_PAGE);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * PER_PAGE) % Articles.length;
        window?.scrollTo({ top: 0, behavior: 'smooth' });
        setShowPost(false)
        setTimeout(() => {
            setItemOffset(newOffset);
            setShowPost(true)
        }, 1500)
    };

    useEffect(() => {
        (async () => {
            const toastID = toast.loading("Please wait...")
            const res = await fetch('/api/article');
            if (res.status === 200) {
                toast.update(toastID, { render: "Data is fetched successfully!", type: "success", isLoading: false, autoClose: 1500, hideProgressBar: true });
                const codes = await res.json();
                const articles = await Promise.all(codes.flatMap(async (gID) => {
                    try {
                        const [gistResponse, commentsResponse] = await Promise.all([
                            fetch(`https://api.github.com/gists/${gID}`),
                            fetch(`https://api.github.com/gists/${gID}/comments`)
                        ]);
                        if (gistResponse.status !== 200) return;
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
                    } catch (error) {
                        console.log('+++++++++++');
                        console.log('🔥🔥🔥🔥🔥🔥', error.message);
                        console.log('+++++++++++');
                    }
                }));
                setArticles(articles.filter(Boolean));
            }
            else {
                setTimeout(() => {
                    toast.update(toastID, { render: "Data not available!", type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: "Sorry, we're unable to display this page right now. Please try again later"
                    })
                        .finally(() => {
                            navigate.push('/')
                        })
                }, 1500)
            }
        })()

    }, []);

    const styles = {
        display: "inline"
    }

    return (
        <>
            <ToastContainer />
            <Head>
                <title>DevCup | Article</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`w3-light-grey w3-content ${INTER.className}`} style={{ maxWidth: 1400 }}>

                <div className="w3-col l8 s12">
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
                                    nextLabel="Next ▶"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="◀ Prev"
                                    renderOnZeroPageCount={null}
                                    className="w3-bar"
                                    activeClassName="w3-inline"
                                    activeLinkClassName="w3-button w3-round w3-green"
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
                        !Articles && <Loading />
                    }
                </div>

                <div className="w3-col l4">
                    {/* About Card */}
                    <div className="w3-card w3-round-large w3-margin w3-margin-top">
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
                    <hr />
                </div>


            </main>
        </>
    )
}