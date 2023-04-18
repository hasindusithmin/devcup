import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// Import the SweetAlert2 library
import Swal from 'sweetalert2';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [gistID, setGistID] = useState('');
  const [username, setUsername] = useState('');

  // Create a function to show the SweetAlert2 input box
  function showUrlInputBox() {
    // Use SweetAlert2 to show an input box with a URL type
    Swal.fire({
      title: 'Enter a URL',
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
        console.log({ gistID, username });
        Swal.fire({
          title: 'Valid URL',
          text: `The URL is valid`,
          icon: 'success'
        });
      }
    });
  }

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

    const { files, owner } = await response.json();

    if (Object.keys(files).length !== 1) {
      return Promise.reject('Keep your gist simple - Use only one file')
    }

    const file = files[Object.keys(files)[0]];

    if (file.type !== 'text/markdown') {
      return Promise.reject("Use markdown format for your files - it's the way to go!")
    }

    setGistID(gistId);
    setUsername(owner.login);

    return Promise.resolve('The URL is valid');
  }





  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <button onClick={showUrlInputBox}>click</button>
      </main>
    </>
  )
}
