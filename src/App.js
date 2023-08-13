import './App.css';
import {useState} from "react"
import "./resources/person-square.svg"

import * as Icon from "react-bootstrap-icons"

function App() {
	const [islogged,setIsLogged]=useState(false);
	const [loading, setLoading] = useState(true);
	const [isLight,setIsLight]=useState(true)

	const changeLight=()=>{
		if (isLight){

		}
		setIsLight(!isLight)
	}
	return (
		<>
			<section className='header'>
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
								<i className='userIcon' class="bi bi-person-square"></i>
							</button>
							
						)}
				</div>
				<div className='dataSide'>
					<h2>CarDex</h2>
					<h4>about</h4>
				</div>
			</section>
		</>
	);
}

export default App;
