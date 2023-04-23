import Gist from "react-gist"
import Link from "next/link";
export default function Post({ data }) {

    function convertUtcToIst(utcDateString) {
        // Create a new Date object from the UTC date string
        const utcDate = new Date(utcDateString);

        // Calculate the UTC offset in milliseconds for the IST time zone
        const istOffset = 5.5 * 60 * 60 * 1000;

        // Add the IST offset to the UTC time to get the local time in IST
        const istTime = utcDate.getTime() + istOffset;

        // Create a new Date object from the local time in IST
        const istDate = new Date(istTime);

        // Return the local date string in IST format
        return istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    }

    function addComment() {
        let w = 800;
        let h = 500;
        let left = (window.screen.width / 2) - (w / 2);
        let top = (window.screen.height / 2) - (h / 2);
        const gist = `https://gist.github.com/${data.writer}/${data.pID}`
        window.open(gist, '_blank', 'width=' + w + ', height=' + h + ', left=' + left + ', top=' + top);
    }


    return (
        <div className="w3-card w3-margin w3-round-large">
            <header className="w3-container w3-light-grey">
                <h5 className="w3-center" style={{ fontWeight: 'bold', marginBottom: '20px', color: '#333333' }}>{data.headline}</h5>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="w3-twothird">
                        <p><span role="img" aria-label="pen">📝</span> Written by: <Link href={`https://github.com/${data.writer}`}>{data.writer}</Link></p>
                        <p><span role="img" aria-label="clock">🕰️</span> Created: {convertUtcToIst(data.created)}</p>
                        <p><span role="img" aria-label="refresh">🔄</span> Last updated: {convertUtcToIst(data.updated)}</p>
                    </div>
                    <div className="w3-third">
                        <img src={data.image} alt="Author's avatar" className="w3-right w3-circle w3-margin-right" style={{ width: '60px' }} />
                    </div>
                </div>
            </header>
            <div className="w3-container">
                <p>
                    <Gist id={data.pID} />
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
                                    <p><span role="img" aria-label="clock">🕰️</span> Created: {convertUtcToIst(comment.created)}</p>
                                    <p><span role="img" aria-label="refresh">🔄</span> Last updated: {convertUtcToIst(comment.updated)}</p>
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
            <hr/>
        </div >
    );

}