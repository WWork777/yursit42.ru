const ServicesMainGrLink = ({ active }) => {
  return (
    <svg
      width="73"
      height="73"
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.2915 51.7083L51.7082 21.2917M51.7082 21.2917H21.2915M51.7082 21.2917V51.7083"
        stroke={active ? "#292C3B" : "#292C3B80"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ServicesMainGrLink;