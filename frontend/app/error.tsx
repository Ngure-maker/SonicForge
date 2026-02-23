'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-xl border border-red-500/40 bg-red-950/20 p-6">
      <h2 className="text-xl font-bold text-red-400">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded bg-electric px-4 py-2 font-semibold text-black">
        Try again
      </button>
    </div>
  );
}
