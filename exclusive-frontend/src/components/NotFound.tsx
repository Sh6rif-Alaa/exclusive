import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section id="not-found">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 py-16">
        <h1 className="text-[110px] font-bold text-center">404 Not Found</h1>
        <p className="text-lg text-center">Your visited page not found. You may go home page.</p>
        <Link to="/" className="bg-primary hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-300">
          Back to home page
        </Link>
      </div>
    </section>
  )
}

export default NotFound