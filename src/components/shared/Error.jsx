export const Error = ({ error }) => {
  return (
    <div className="bg-red-500 rounded-xl max-w-lg mx-auto text-center p-4 mt-8">
      <h1>
        <strong>An error has occurred:</strong>
      </h1>
      <p>{error?.message}</p>
    </div>
  );
};
