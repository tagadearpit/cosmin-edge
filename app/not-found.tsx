import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
        404 - Not Found
      </h2>
      <p className="text-neutral-400 mb-8 text-center max-w-md">
        The sector you are looking for does not exist in this universe.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-300 hover:bg-violet-600/30 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
