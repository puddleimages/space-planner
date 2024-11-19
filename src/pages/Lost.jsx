import { Link } from 'react-router-dom';

const Lost = () => {

  return (
    <div>
      <h2>
        It appears that you are lost.
      </h2>
      <div>
        This link might take you home:
      </div>
      <Link to="/">
        Home
      </Link>
    </div>
  );
}

export default Lost;
