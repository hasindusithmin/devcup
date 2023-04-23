import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// Import the SweetAlert2 library
import Swal from 'sweetalert2';
import { useState } from 'react';
import Gist from 'super-react-gist'
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [gistID, setGistID] = useState('');

  // Create a function to show the SweetAlert2 input box
  function showUrlInputBox() {
    // Use SweetAlert2 to show an input box with a URL type
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
              setVerified(true)
            }
          })


      }
    });
  }

  // Create a function to validate a URL
  async function validateUrl(url) {
    console.log(url);
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
  const [posting,setPosting] = useState(false);

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

  return (
    <>
      <Head>
        <title>devcup || home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <main className={`w3-panel w3-content ${inter.className}`} style={{ maxWidth: 1400 }}>
        <div className="w3-col l8 s12">
          <div>
            <button className='w3-button w3-blue' onClick={showUrlInputBox} disabled={verified ? true : false}>Add</button>
            <button className='w3-button w3-red' onClick={published} disabled={verified && !posting ? false : true}>Post</button>
          </div>
        </div>
        <div className="w3-col l4">
          {
            verified &&
            <Gist
              url={`https://gist.github.com/hasindusithmin/${gistID}`}
              LoadingComponent={() => <div>Waiting for Gist...</div>}
            />
          }
        </div>
      </main>
    </>
  )
}
