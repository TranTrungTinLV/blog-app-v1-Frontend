import React from 'react'
import poster from '../../img/poster.png'
export default function HomePage() {
  return (
   <>
    <section className="pb-10 bg-gray-800 h-full lg:h-screen">
        <div className="container relative px-4 mx-auto">
            <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <span className="text-lg font-bold text-blue-400">
                Create posts to educate
              </span>
              <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
                Pen down your ideas{" "}
                <span className="text-yellow-500">By creating a post</span>
              </h2>
              <p className="mb-12 max-w-2xl lg:text-2xl sm:text-sm lg:mb-16 2xl:mb-24 md:text-xl text-gray-100">
                 Welcome to my blog where we share feelings and 
                 <br/>
                 connect friends together into a harmonious community 
              </p>
              <a
                className="inline-block px-12 py-5 text-lg text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
                href="/"
              >
                Buy This Course
              </a>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <img className="md:w-screen lg:h-auto md:h-screen sm:h-auto sm: h-64 object-cover object-center mt-10 rounded" src={poster} alt={poster} />
            </div>
            </div>
        </div>
    </section>
   </>
  )
}
