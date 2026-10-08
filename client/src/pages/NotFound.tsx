import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] items-center bg-[#F5F5F7] pt-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium text-[#1c5386]">404</p>
        <h1 className="mt-2 max-w-2xl text-5xl font-semibold leading-[1.03] tracking-[-0.035em] text-[#0B1628] md:text-7xl">
          That page has taken a different route.
        </h1>
        <p className="mt-5 max-w-md text-lg text-[#6e6e73]">The link may be old or mistyped. Let's get you back on the road.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-[#1c5386] px-7 py-3.5 text-[15px] font-medium text-white transition hover:bg-[#164470]">
          Back to home
        </Link>
      </div>
    </main>
  );
}
