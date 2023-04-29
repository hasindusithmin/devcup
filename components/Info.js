import { Typewriter } from 'react-simple-typewriter'
import { useState } from 'react';
import Link from 'next/link';
export default function Info() {

    const [infoLength, setInfoLength] = useState(0);
    const [linkedin, showLinkedin] = useState(false);
    const infoType = () => {
        if (infoLength === 722) showLinkedin(true)
        setInfoLength(prev => prev + 1)
    }
    return (
        <>
            <img
                src="/devcup-logo.png"
                style={{ width: "100%" }}
                className='w3-round'
            />
            <div className="w3-container w3-white w3-padding">
                <h4 style={{ color: '#7b6d55' }}>
                    WELOCME TO DEVCUP
                </h4>
                <p>
                    <Typewriter
                        words={
                            [
                                `👋 Welcome to our blog! Here, we strive to provide valuable insights and resources for developers who want to stay up-to-date with the latest industry trends and technologies. 🌟
                      💻 We understand that developers are always on the go, which is why we offer a collection of informative and concise articles that you can read while enjoying a cup of coffee ☕️.
                      👨‍💻 From coding tutorials and best practices to career advice and interviews with top developers, we've got you covered with content that's easy to consume and apply to your work. 💡
                      🚀 Join the DevCup community today to elevate your skills and stay ahead in your career! 🙌
                      `
                            ]
                        }
                        typeSpeed={5}
                        stopBlinkinOnComplete
                        cursor="|"
                        onType={infoType}
                    />

                </p>
                {
                    linkedin &&
                    <p className='w3-center'>
                        <Link href="https://www.linkedin.com/company/devcup/" target='_blank' className='w3-button w3-light-gray w3-round-xxlarge'><i className="fa fa-linkedin-square" aria-hidden="true"></i> <b>Visit our linkedin page</b></Link>
                    </p>
                }
            </div>
        </>
    )
}