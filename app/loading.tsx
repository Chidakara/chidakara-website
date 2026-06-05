export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">

      <div className="flex flex-col items-center gap-6">

        <div className="h-12 w-12 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />

        <p className="text-gray-400">
          Loading Chidakara...
        </p>

      </div>

    </div>
  );
}