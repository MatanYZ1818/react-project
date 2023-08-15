import './App.css';
import React, {useState} from "react"
import "./resources/person-square.svg"
import * as Icon from "react-bootstrap-icons"
import Navbar from './Navbar';

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
				hello
				<div className='siteContainer'>
					<h1>Cardex</h1>
					<h4>hello and welcome to a new experience in sharing and managing your business cards</h4>
					<div className='devider'></div>

				</div>
			</body>
		</ userContext.Provider>
	);
}

export default App;
