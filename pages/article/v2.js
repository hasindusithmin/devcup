import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function App() {
    const [total, setTotal] = useState(0);
    const [Articles, setArticles] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const perPage = 3;

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/article/v2/${currentPage + 1}`)
            if (res.status === 200) {
                const { total, codes } = await res.json();
                setTotal(total);
                const articles = await Promise.all(codes.flatMap(async (gID) => {
                    try {
                        const [gistResponse, commentsResponse] = await Promise.all([
                            fetch(`https://api.github.com/gists/${gID}`),
                            fetch(`https://api.github.com/gists/${gID}/comments`)
                        ]);
                        if (gistResponse.status !== 200) throw Error()
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
                        console.log('🔥🔥🔥🔥🔥🔥', error.message);
                    }
                }));
                console.log(articles);
                setArticles(articles.filter(Boolean));
            }
            else {
                console.log('🔥🔥🔥🔥🔥🔥', error.message);
            }
        })()
    }, [currentPage]);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div>


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
    );
}

export default App;
