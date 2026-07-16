import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md rounded-[2rem] border border-orange-100 bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur md:p-12">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-2xl font-black text-[#f97316] shadow-sm">404</div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-950">Page Not Found</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">Oops! The toy shelf you are looking for doesn't exist or might have been moved to another section.</p>

        <div className="mt-8">
          <Link to="/" className="inline-block rounded-2xl bg-[#f97316] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(249,115,22,0.2)] transition duration-200 hover:bg-[#ea580c] active:scale-[0.98]">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}