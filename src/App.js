import './App.css';
import {useState} from "react"
import "./resources/person-square.svg"

import * as Icon from "react-bootstrap-icons"

function App() {
	const [islogged,setIsLogged]=useState(false);
	const [loading, setLoading] = useState(true);
	const [isLight,setIsLight]=useState(true)
	const [data,setData]=useState([])

	const changeLight=()=>{
		if (isLight){

		}
		setIsLight(!isLight)
	}
	return (
		<>
			<header>
				<div className='userSide'>
					{!islogged ? (
							<>
								<button className='headerButton login'>Login</button>
								<button className='headerButton signup'>signup</button>
								{isLight ? 
									<Icon.MoonFill onClick={changeLight} className={isLight? "":"nightButton"}/>
									:
									<Icon.BrightnessHigh onClick={changeLight} className={isLight? "dayButton":""}/>
								}
							</>
						)
						:
						(
							<button>
								<Icon.PersonSquare />
							</button>
							
						)}
				</div>
				<div className='dataSide'>
					<h2>CarDex</h2>
					<h4>about</h4>
				</div>
			</header>
			<body>
				hello
				<div className='siteContainer'>
					<h1>Cardex</h1>
					<h4>hello and welcome to a new experience in sharing and managing your business cards</h4>
					<div className='devider'></div>

				</div>
			</body>
		</>
	);
}

export default App;
