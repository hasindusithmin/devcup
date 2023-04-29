import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import Gist from 'super-react-gist'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import devicon from '@/js/devicon';
import { Waypoint } from 'react-waypoint';
import Loading from '@/components/Loading';
import { Typewriter } from 'react-simple-typewriter'
import Info from '@/components/Info';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [gistID, setGistID] = useState('');

  // Create a function to validate a URL
  async function validateUrl(url) {
    const validProtocol = 'https://';
    const validDomain = 'gist.github.com';

    if (!url.startsWith(validProtocol)) {
      return Promise.reject('Invalid protocol. Please use https instead of http');
    }

    const urlWithoutProtocol = url.slice(validProtocol.length);
    const [domain, username, gistId] = urlWithoutProtocol.split('/');

    if (domain !== validDomain) {
      return Promise.reject('Invalid domain. Only gist.github.com is allowed');
    }

    if (!username || !/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username)) {
      return Promise.reject('Oops! The username you entered is invalid. Please check and try again');
    }

    const response = await fetch(`https://api.github.com/gists/${gistId}`);

    if (!response.ok) {
      return Promise.reject("Oops! We couldn't find the gist you were looking for. Please check the URL and try again");
    }

    const { files, owner, description } = await response.json();
    if (Object.keys(files).length !== 1) {
      return Promise.reject('Keep your gist simple - Use only one file')
    }

    const file = files[Object.keys(files)[0]];

    if (file.type !== 'text/markdown') {
      return Promise.reject("Use markdown format for your files - it's the way to go!")
    }

    if (description === "") {
      return Promise.reject('Please provide a brief description of your Gist')
    }

    setGistID(gistId);

    return Promise.resolve('The URL is valid');
  }

  const [verified, setVerified] = useState(false);
  const [posting, setPosting] = useState(false);

  const homePageSlides = [
    {
      "image": "slide1.jpg",
      "text": "Code smarter, not harder",
      "position": "bottomleft"
    },
    {
      "image": "slide2.jpg",
      "text": "Design for scalability",
      "position": "topleft"
    },
    {
      "image": "slide3.jpg",
      "text": "Continuous improvement",
      "position": "topright"
    },
    {
      "image": "slide4.jpg",
      "text": "Automate everything",
      "position": "middle"
    },
    {
      "image": "slide5.jpg",
      "text": "Simplify, then optimize",
      "position": "bottomright"
    }
  ]

  const openModalForDevIcon = (key, value) => {
    Swal.fire({
      title: key,
      width: 300,
      imageUrl: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key.toLowerCase()}/${value}.svg`,
      imageHeight: 50,
      imageAlt: key
    })
  }

  const openModalForInstruction = () => {
    Swal.fire({
      title: 'To create a markdown file in Gist, follow these simple steps:',
      width: 500,
      imageUrl: `/instruction.gif`,
      imageHeight: 1000,
      imageAlt: 'instruction video'
    })
  }

  const openModalForVerifyURL = () => {
    Swal.fire({
      title: 'Enter a Gist URL',
      input: 'url',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Validate',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (url) => {
        // Validate the URL and return a Promise that resolves to the result
        return validateUrl(url)
          .catch((error) => {
            console.log(error);
            Swal.showValidationMessage(error);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

      if (result.isConfirmed) {

        Swal.fire(
          'Verified',
          '',
          'success'
        )
          .then((result) => {
            if (result.isConfirmed) {
              setVerified(true);
            }
          })
      }
    });
  }

  async function published() {
    const toastID = toast.loading("Please wait...")
    setPosting(true)
    const URL = `${process.env.NEXT_PUBLIC_APP_SERVICE}/endpoint/codeHander?method=PUT&code=${gistID}`
    try {
      const res = await fetch(URL);
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      toast.update(toastID, { render: "Success! post has been added!", type: "success", isLoading: false, autoClose: 1500, hideProgressBar: true });
      setPosting(false);
      setVerified(false);
    } catch (error) {
      setPosting(false)
      toast.update(toastID, { render: error.message, type: "error", isLoading: false, autoClose: 1500, hideProgressBar: true });
    }
  }

  const animationDelay = 1500;

  const [guildLoading, setGuildLoading] = useState(false)
  const [guild, setGuild] = useState(false);

  const showGuild = () => {
    if (guild) return
    setGuildLoading(true)
    setTimeout(() => {
      setGuildLoading(false)
      setGuild(true)
    }, animationDelay)
  }

  const [cateLoading, setCateLoading] = useState(false)
  const [cate, setCate] = useState(false);

  const showCate = () => {
    if (cate) return
    setCateLoading(true)
    setTimeout(() => {
      setCateLoading(false)
      setCate(true)
    }, animationDelay)
  }
  return (
    <>
      <Head>
        <title>DevCup | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <main className={`w3-content ${inter.className}`} style={{ maxWidth: 1400 }}>

        <div className="w3-col l8 s12">

          <div className="w3-card w3-margin-small w3-padding w3-round-xlarge w3-hide-large">
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
                👋 Welcome to our blog! Here, we strive to provide valuable insights and resources for developers who want to stay up-to-date with the latest industry trends and technologies. 🌟
                💻 We understand that developers are always on the go, which is why we offer a collection of informative and concise articles that you can read while enjoying a cup of coffee ☕️.
                👨‍💻 From coding tutorials and best practices to career advice and interviews with top developers, we've got you covered with content that's easy to consume and apply to your work. 💡
                🚀 Join the DevCup community today to elevate your skills and stay ahead in your career! 🙌
              </p>
              <p className='w3-center'>
                <Link href="https://www.linkedin.com/company/devcup/" target='_blank' className='w3-button w3-light-gray w3-round-xxlarge'><i className="fa fa-linkedin-square" aria-hidden="true"></i> <b>Visit our linkedin page</b></Link>
              </p>
            </div>
          </div>
          {
            verified &&
            <div className="w3-card w3-margin-small w3-padding w3-round-xlarge w3-hide-large">
              <div className='w3-center w3-padding'>
                <button className='w3-button w3-blue w3-round-large w3-margin-right' onClick={published} disabled={verified && !posting ? false : true}>
                  <b><i className="fa fa-bullhorn" aria-hidden="true"></i> Publish</b>
                </button>
                <button className='w3-button w3-red w3-round-large w3-margin-left' onClick={() => { setVerified(false) }} disabled={verified && !posting ? false : true}>
                  <b><i className="fa fa-ban" aria-hidden="true"></i> Cancel</b>
                </button>
              </div>
              <Gist
                url={`https://gist.github.com/hasindusithmin/${gistID}`}
                LoadingComponent={() => <div>Waiting for Gist...</div>}
              />
            </div>
          }
          <div className="w3-card w3-margin-small w3-padding w3-round-xlarge">
            <Splide aria-label="Home Page Slideshow" options={{ autoplay: true, interval: 3000 }}>
              {
                homePageSlides.map(({ image, text, position }) => {
                  return (
                    <SplideSlide key={text}>
                      <div className="w3-display-container">
                        <img src={`/home/${image}`} style={{ width: '100%' }} alt={text} className='w3-image w3-round-large' />
                        <div className={`w3-display-${position} w3-container w3-padding-16 w3-black w3-opacity`}>
                          <b>{text}</b>
                        </div>
                      </div>
                    </SplideSlide>
                  )
                })
              }
            </Splide>
            <div>
              <h3 style={{ color: '#7b6d55' }}>
                THE POWER OF KNOWLEDGE SHARING
              </h3>
              <p>
                Sharing knowledge is a vital aspect of personal and organizational growth.
                By sharing our knowledge with others, we not only learn from them but also build strong relationships based on trust and respect.
                👥💡 Collaborating with others helps to create innovative solutions and promotes a culture of learning, where individuals and organizations continuously develop their skills and knowledge.
                🌟 When knowledge is shared freely, it can lead to increased productivity and a competitive edge in the marketplace.
                So, let's embrace the power of knowledge sharing and work together to achieve our goals! 🤝💪🚀
              </p>
            </div>
            <Waypoint onEnter={showGuild} />
          </div>

          {
            guildLoading && <Loading />
          }

          {
            guild &&
            <div className="w3-card w3-margin-small w3-padding w3-round-xlarge">
              <h3 style={{ color: '#7b6d55' }}>
                A STEP-BY-STEP GUIDE TO SHARING YOUR IDEAS ON DEVCUP
              </h3>
              To create a markdown file in Gist, follow these simple steps:
              <ol className='w3-ul'>
                <li>🌐 Go to the <Link href="https://gist.github.com/" target='_blank'>gist.github.com</Link> website.</li>
                <li>👤 Sign in to your account or create a new one if you haven't already.</li>
                <li>➕ Click on the "New Gist" button in the top-right corner.</li>
                <li>📝 Name your Gist and add a description if you want to.</li>
                <li>📋 Write or copy-paste your markdown content into the editor.</li>
                <li>💾 Click on the "Create public Gist" button to save your file.</li>
              </ol>
              <p>
                <button className='w3-button w3-light-gray w3-round-xlarge' onClick={openModalForInstruction}><i className="fa fa-eye" aria-hidden="true"></i> <b>For visual learners</b></button>
              </p>
              To add your Gist to DevCup, follow these steps:
              <ol className='w3-ul'>
                <li>📋 Copy the link address of your Gist from the address bar in your browser.</li>
                <li>👉 Go to DevCup and click on the "Add post" button.</li>
                <li>📝 Paste the link address of your Gist into the appropriate field.</li>
                <li>🚀 Click on the "Validate" button to add your Gist to DevCup.</li>
                <li>⏳ Wait for DevCup to complete its verification process.</li>
                <li>✅ Once your Gist has been validated, the "Publish" button will become available. Click on it to publish your post.</li>
              </ol>
              <p>
                <button className='w3-button w3-light-gray w3-round-xlarge' disabled={verified ? true : false} onClick={openModalForVerifyURL}><i className="fa fa-plus-circle" aria-hidden="true"></i> <b>Add post</b></button>
              </p>
              <Waypoint onEnter={showCate} />
            </div>
          }

          {
            cateLoading && <Loading />
          }

          {
            cate &&
            <>
              <div className="w3-card w3-margin-small w3-padding w3-round-xlarge">
                <h3 style={{ color: '#7b6d55' }}>
                  WHICH CATEGORY WOULD YOU LIKE TO POST UNDER?
                </h3>
                <h4 style={{ color: '#7b6d55' }}>
                  HOW ABOUT THIS:
                </h4>
                <p className='w3-center'>
                  {
                    Object.entries(devicon).map(([key, value]) =>
                      <Image key={key} className="w3-tag w3-white" width={48} height={48} src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key.toLowerCase()}/${value}.svg`} alt={key} title={key} onClick={() => { openModalForDevIcon(key, value) }} />
                    )
                  }
                </p>
              </div>
            </>
          }

        </div>

        <div className="w3-col l4 w3-hide-small w3-hide-medium">
          <div className="w3-card w3-round-xlarge w3-margin-small">
            <Info />
          </div>
          {
            verified &&
            <div className="w3-card w3-round-xlarge w3-margin-small w3-padding">
              <div className='w3-center w3-padding'>
                <button className='w3-button w3-blue w3-round-large w3-margin-right' onClick={published} disabled={verified && !posting ? false : true}>
                  <b><i className="fa fa-bullhorn" aria-hidden="true"></i> Publish</b>
                </button>
                <button className='w3-button w3-red w3-round-large w3-margin-left' onClick={() => { setVerified(false) }} disabled={verified && !posting ? false : true}>
                  <b><i className="fa fa-ban" aria-hidden="true"></i> Cancel</b>
                </button>
              </div>
              <Gist
                url={`https://gist.github.com/hasindusithmin/${gistID}`}
                LoadingComponent={() => <div>Waiting for Gist...</div>}
              />
            </div>
          }
        </div>
      </main>
    </>
  )
}
