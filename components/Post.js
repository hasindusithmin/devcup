import Link from "next/link";
import { toast } from "react-toastify";
import Gist from 'super-react-gist'
import { Typewriter } from 'react-simple-typewriter'
export default function Post({ data }) {

    function convertUTCToSriLankaTime(utcDateTimeString) {
        const date = new Date(utcDateTimeString);
        const options = { timeZone: 'Asia/Colombo' }; // Set timezone to Sri Lanka
        const dateTimeStr = date.toLocaleString('en-US', options);
        return dateTimeStr;
    }


    function addComment() {
        let w = 800;
        let h = 500;
        let left = (window.screen.width / 2) - (w / 2);
        let top = (window.screen.height / 2) - (h / 2);
        const gist = `https://gist.github.com/${data.writer}/${data.pID}`
        window.open(gist, '_blank', 'width=' + w + ', height=' + h + ', left=' + left + ', top=' + top);
    }

    function textToCopy() {
        navigator.clipboard.writeText(data.pID)
            .then(() => {
                toast.success("Copied", { autoClose: 500, hideProgressBar: true, position: 'top-left' })
            })
    }


    return (
        <div className="w3-card w3-round-large w3-margin-small">
            <header className="w3-container w3-light-grey">
                <h5 className="w3-center" style={{ fontWeight: 'bold', marginBottom: '20px', color: '#7b6d55' }} onDoubleClick={textToCopy}>
                    <Typewriter
                        words={[data.headline]}
                        typeSpeed={90}
                        stopBlinkinOnComplete
                        cursor="|"
                    />
                </h5>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="w3-twothird">
                        <p><span role="img" aria-label="pen">📝</span> Written by: <Link href={`https://github.com/${data.writer}`} target="_blank">{data.writer}</Link></p>
                        <p><span role="img" aria-label="clock">🕰️</span> Created: {convertUTCToSriLankaTime(data.created)}</p>
                        <p><span role="img" aria-label="refresh">🔄</span> Last updated: {convertUTCToSriLankaTime(data.updated)}</p>
                    </div>
                    <div className="w3-third">
                        <img src={data.image} alt="Author's avatar" className="w3-right w3-circle w3-margin-right" style={{ width: '60px' }} />
                    </div>
                </div>
            </header>
            <div className="w3-container">
                <p>
                    <Gist url={`https://gist.github.com/${data.writer}/${data.pID}`} LoadingComponent={() => <div>⏳Please wait...</div>} />
                </p>
                <div className="w3-padding">
                    <button className="w3-button w3-blue w3-round-large" onClick={addComment}>Add Comment 🗨️</button>
                </div>
                {
                    data.comments.length > 0 &&
                    <div className="w3-container w3-padding">
                        {data.comments.map((comment) => (
                            <div key={comment.cID} className="w3-card-2 w3-margin" style={{ width: '90%' }}>
                                <header className="w3-container w3-light-grey">
                                    <p><span role="img" aria-label="speech bubble">💬</span> Comment by: <Link href={`https://github.com/${comment.commenter}`}>{comment.commenter}</Link></p>
                                    <p><span role="img" aria-label="clock">🕰️</span> Created: {convertUTCToSriLankaTime(comment.created)}</p>
                                    <p><span role="img" aria-label="refresh">🔄</span> Last updated: {convertUTCToSriLankaTime(comment.updated)}</p>
                                </header>
                                <div className="w3-container w3-padding">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '150px' }}>
                                            <img
                                                src={comment.image}
                                                alt="Commenter's avatar"
                                                className="w3-left w3-circle w3-margin-right"
                                                style={{ width: '50px' }}
                                            />
                                        </div>
                                        <div className="w3-rest">
                                            {comment.body}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <hr />
        </div >
    );

}