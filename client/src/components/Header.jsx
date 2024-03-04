import PropTypes from 'prop-types';

const Header = ({ currentSection, handleNavigationClick }) => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">ChitChat Central</h1>
        <nav>
          <ul className="flex space-x-4">
            {['Home', 'Friends', 'Messages', 'Logout'].map(section => (
              <li
                key={section}
                className={`cursor-pointer ${
                  currentSection === section ? 'text-blue-500' : 'hover:text-blue-500'
                }`}
                onClick={() => handleNavigationClick(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentSection: PropTypes.string.isRequired,
  handleNavigationClick: PropTypes.func.isRequired,
};

export default Header