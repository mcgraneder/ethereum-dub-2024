interface Props {
  onClick: () => void;
  className?: String;
}

function LearnMoreButton({ onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-primary my-4 w-fit rounded-full border-2 border-blue-500 px-6 py-1 text-blue-500 transition duration-200 ease-in-out hover:border-blue-400 hover:bg-blue-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 ${className}`}
    >
      <span className={`text-sm ${className}`}>Learn More</span>
    </button>
  );
}

export default LearnMoreButton;
