import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import './Home.css'; // Import the CSS file

function Home() {
    
    const navigate = useNavigate();

    function clickHandler () 
    {
        localStorage.removeItem('token');
        localStorage.removeItem('logedInUser');
        handleSuccess('Logout Successfully');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    return (
        <div className='home-container'>
            <p className='welcome-text'>
                Welcome, Developer! Keep pushing the limits of what's possible.
            </p>
            <button 
                onClick={clickHandler} 
                className='logout-button'
            >
                Logout
            </button>
        </div>
    );
}

export default Home;
