import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-gray-600 mb-6">Could not find requested resource.</p>
      <Link 
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
