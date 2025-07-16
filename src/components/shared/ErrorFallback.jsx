export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="max-w-xl flex flex-col justify-center mx-auto text-center mt-8">
      <div className="bg-red-500 rounded-xl max-w-xl mx-auto text-center px-6 py-2">
        <h1>
          <strong>An error has occurred:</strong>
        </h1>
        <p>{error?.message}</p>
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 cursor-pointer text-black"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    </div>
  );
};
