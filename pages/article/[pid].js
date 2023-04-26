import Post from '@/components/Post';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })


export default function Article() {

    const router = useRouter();
    const { pid } = router.query;
    const [articles, setArticles] = useState(null);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState(false);

    useEffect(() => {
        (async () => {
            if (pid) {
                const toastID = toast.loading("Please wait...")
                const res = await fetch(`/api/article/${pid}`);
                if (res.status === 200) {
                    setError(null);
                    setProcess(false);
                    const codes = await res.json();
                    const promises = codes.map(gID => {
                        const gistPromise = fetch(`https://api.github.com/gists/${gID}`);
                        const commentsPromise = fetch(`https://api.github.com/gists/${gID}/comments`);
                        return Promise.all([gistPromise, commentsPromise])
                            .then(([gistResponse, commentsResponse]) => {
                                if (gistResponse.status === 200) {
                                    return Promise.all([gistResponse.json(), commentsResponse.json()])
                                        .then(([gistData, commentsData]) => {
                                            if (gistData && gistData.owner) {
                                                const { id, created_at, updated_at, description, owner } = gistData;
                                                const { login, avatar_url } = owner;
                                                if (commentsData && commentsData.length > 0) {
                                                    const comments = commentsData.map(comment => ({
                                                        cID: comment.id,
                                                        commenter: comment.user.login,
                                                        image: comment.user.avatar_url,
                                                        created: comment.created_at,
                                                        updated: comment.updated_at,
                                                        body: comment.body
                                                    }));
                                                    return { pID: id, created: created_at, updated: updated_at, headline: description, writer: login, image: avatar_url, comments };
                                                } else {
                                                    return { pID: id, created: created_at, updated: updated_at, headline: description, writer: login, image: avatar_url, comments: [] };
                                                }
                                            }
                                        })
                                        .catch(error => {
                                            toast.update(toastID, { render: error.message, type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
                                            console.error(error.message)
                                        });
                                }
                            })
                            .catch(error => {
                                toast.update(toastID, { render: error.message, type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
                                console.error(error)
                            });
                    });
                    Promise.all(promises)
                        .then(data => {
                            const filteredData = data.filter(dt => dt !== undefined)
                            setArticles(filteredData);
                            setError(null);
                            setProcess(true);
                            toast.update(toastID, { render: "Success", type: "success", isLoading: false, autoClose: 1500, hideProgressBar: true });
                        })
                        .catch(error => {
                            toast.update(toastID, { render: error.message, type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
                            setArticles(null);
                            setError(error.message);
                            setProcess(true);

                        });

                }
                else if (res.status === 404) {
                    setTimeout(() => {
                        toast.update(toastID, { render: "No matching results found", type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
                        setArticles(null);
                        setError("No matching results found");
                        setProcess(true);
                    }, 2500)
                }
                else {
                    setTimeout(() => {
                        toast.update(toastID, { render: "Sorry, we couldn't get the information you requested", type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
                        setArticles(null);
                        setError("Sorry, we couldn't get the information you requested");
                        setProcess(true);
                    }, 2500)
                }


            }
        })()

    }, [pid]);

    return (
        <>
            <Head>
                {pid && <title>Article | Page-{pid}</title>}
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer />
            <main className={`w3-light-grey w3-content ${inter.className}`} style={{ maxWidth: 1400 }}>

                <div className="w3-col l8 s12">
                    {
                        articles &&
                        <>
                            <div className=''>
                                {articles.map(article => <Post key={article.pID} data={article} />)}
                            </div>
                            <div className='w3-container'>
                                <Link href={parseInt(pid) === 1 ? '/article/1' : `/article/${parseInt(pid) - 1}`} className="w3-btn w3-red w3-round-large w3-left">
                                    Prev
                                </Link>
                                <Link href={`/article/${parseInt(pid) + 1}`} className="w3-btn w3-green w3-round-large w3-right">
                                    Next
                                </Link>
                            </div>
                            <div className='w3-text-white'>...</div>
                        </>
                    }
                    {
                        error &&
                        <>
                            <div className='w3-text-red w3-center' style={{ fontWeight: 'bold' }}>{error}</div>
                            <div className='w3-container'>
                                <Link href={parseInt(pid) === 1 ? '/article/1' : `/article/${parseInt(pid) - 1}`} className="w3-btn w3-red w3-round-large w3-left">
                                    Prev
                                </Link>
                                <Link href={`/article/${pid}`} className="w3-btn w3-green w3-round-large w3-right">
                                    Next
                                </Link>
                            </div>
                        </>
                    }
                </div>

                {
                    process &&
                    <div className="w3-col l4">
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
                }


            </main>

        </>
    )
}