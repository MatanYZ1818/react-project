import './App.css';
import React, {useState} from "react"
import "./resources/person-square.svg"
import Navbar from './components/Navbar';
import UserRouter from './UserRouter';
import Snackbar from './components/Snackbar';

export const userContext=React.createContext();

function App() {
	const [islogged,setIsLogged]=useState(false);
	const [loading, setLoading] = useState(true);
	const [isLight,setIsLight]=useState(true)
	const [data,setData]=useState([])
    const [snackbarText, setSnackbarText] = useState('');
	const [user,setUser]=useState()

	const changeLight=ev=>{
		console.log(ev);
		setIsLight(!isLight)
	}

    const snackbar = text => {
        setSnackbarText(text);
        setTimeout(() => setSnackbarText(''), 3 * 1000);
    }

	const objContext={islogged, setIsLogged,
		loading, setLoading,
		isLight, setIsLight,
		data, setData, 
		user, setUser,
		changeLight, setLoading, snackbar}

	return (
		<userContext.Provider value={objContext}>
			<header>
				<Navbar />
			</header>
			<body>
				<UserRouter />
			</body>

			{snackbarText&& <Snackbar text={snackbarText} />}
		</ userContext.Provider>
	);
}

export default App;
