import { Link } from 'react-router-dom';

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center mt-5 mb-5">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={`/page/${x + 1}`}
            className={`px-4 py-2 mx-1 rounded text-center transition-colors duration-300 ${x + 1 === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
