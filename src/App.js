import './App.css';
import React, {useState} from "react"
import "./resources/person-square.svg"
import * as Icon from "react-bootstrap-icons"
import Navbar from './Navbar';
import MainPage from './MainPage';

export const userContext=React.createContext();

function App() {
	const [islogged,setIsLogged]=useState(false);
	const [loading, setLoading] = useState(true);
	const [isLight,setIsLight]=useState(true)
	const [data,setData]=useState([])

	const changeLight=ev=>{
		console.log(ev);
		setIsLight(!isLight)
	}
	return (
		<userContext.Provider value={{islogged ,setIsLogged ,loading ,setLoading ,isLight ,setIsLight ,data ,setData, changeLight}}>
			<header>
				<Navbar />
			</header>
			<body>
				<MainPage />
			</body>
		</ userContext.Provider>
	);
}

export default App;
