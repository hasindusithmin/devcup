if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const f=e=>a(e,n),r={module:{uri:n},exports:t,require:f};s[n]=Promise.all(i.map((e=>r[e]||f(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/7ZFlr_vOLrKnSPtlxb0-B/_buildManifest.js",revision:"d1aa29ee75b16623ce50f06c09f636e6"},{url:"/_next/static/7ZFlr_vOLrKnSPtlxb0-B/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/230-1b69defab83890c4.js",revision:"1b69defab83890c4"},{url:"/_next/static/chunks/326-9a6a76077301e33d.js",revision:"9a6a76077301e33d"},{url:"/_next/static/chunks/455-d69af999bc784e2b.js",revision:"d69af999bc784e2b"},{url:"/_next/static/chunks/744-ec5fcab6c51c1242.js",revision:"ec5fcab6c51c1242"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-1cb174da82364de6.js",revision:"1cb174da82364de6"},{url:"/_next/static/chunks/pages/_app-56858848681f53ef.js",revision:"56858848681f53ef"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/article/%5Bpid%5D-cef0dbfda38ce625.js",revision:"cef0dbfda38ce625"},{url:"/_next/static/chunks/pages/article/v1-84e08bd6b0aff6f6.js",revision:"84e08bd6b0aff6f6"},{url:"/_next/static/chunks/pages/article/v2-f6c6e7f378ac7cc8.js",revision:"f6c6e7f378ac7cc8"},{url:"/_next/static/chunks/pages/index-f2ef32f5e06b2d15.js",revision:"f2ef32f5e06b2d15"},{url:"/_next/static/chunks/pages/posts-3d549f3074575e6b.js",revision:"3d549f3074575e6b"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"59c5c889f52620d6"},{url:"/_next/static/css/1f30f2e565d069d8.css",revision:"1f30f2e565d069d8"},{url:"/_next/static/css/f8d0202b2cde090e.css",revision:"f8d0202b2cde090e"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/devcup-logo.png",revision:"efa3d8d909ddb560f40f655df117993f"},{url:"/favicon.ico",revision:"5164495bca32a10507e5e0b0cd1f0905"},{url:"/gifs/articles.gif",revision:"0d80ceac1fa779cadecd57d122bdf971"},{url:"/gifs/coffee.gif",revision:"a315fb729bf024de06bfd2374e41ada2"},{url:"/gifs/iloveread.gif",revision:"a40d2e6128b57db70aec6dc2a0502104"},{url:"/gifs/index.gif",revision:"cc1ecaf09323c383915d0f7e4fac87b5"},{url:"/gifs/loading.gif",revision:"9700dbf60b86c080869ed88863f95080"},{url:"/github.png",revision:"435889ad4653ea83332e1cb6a43d02a9"},{url:"/home/slide1.jpg",revision:"f3675c1008254a7f2ec066a17ece8495"},{url:"/home/slide2.jpg",revision:"2d4ae7e60e5289a22d8c170acf89a486"},{url:"/home/slide3.jpg",revision:"a87aaebdb114a25f0c05a5c7b3dfc013"},{url:"/home/slide4.jpg",revision:"4627c3758c54bc1c4aada0975b717b7e"},{url:"/home/slide5.jpg",revision:"cb21a97603a84618352f93e68083dc12"},{url:"/icon-192x192.png",revision:"af4ca21f1f2b56f59a01d663e2b15b7f"},{url:"/icon-256x256.png",revision:"881fd7fa0919232fc728e6cb9835ba57"},{url:"/icon-384x384.png",revision:"b992cca3cba4cb985c17b6d0529bff7c"},{url:"/icon-512x512.png",revision:"4755098441c0ba40c8aeaed1db473410"},{url:"/instruction.gif",revision:"719002855a9ab1662f9d64a4f495ad10"},{url:"/linkedin.png",revision:"d91fa399aa8f0932791a25587388a5cb"},{url:"/manifest.json",revision:"9307a24eadf64d45b7b00c05ae4baf09"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
