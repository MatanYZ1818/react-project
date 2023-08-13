import './App.css';
import {useState} from "react"

function App() {
	const [islogged,setIsLogged]=useState(false)
	const [loading, setLoading] = useState(true);
	return (
		<>
			<div className='header'>
				<div className='userSide'>
					{islogged ? (
						<button className='headerButton login'>Login</button>
						)
						:
						(<i class="bi bi-person-square"></i>)}
				</div>
				<div className='dataSide'></div>
			</div>
		</>
	);
}

export default App;
