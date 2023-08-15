
import { useContext } from "react"
import * as Icon from "react-bootstrap-icons"
import { userContext } from "./App"

export default function Navbar(){
    const {islogged,changeLight,isLight}=useContext(userContext)
    return(
        <>
            <div className='userSide'>
                {!islogged ? (
                        <>
                            <Link to="/login"><button className='headerButton login'>Login</button></Link>
                            <Link to="/signup"><button className='headerButton signup'>Signup</button></Link>
                            {isLight ? 
                                <Icon.MoonFill onClick={changeLight} class={isLight? "iii":"nightButton"}/>
                                :
                                <Icon.BrightnessHigh onClick={changeLight} class={isLight? "dayButton":""}/>
                            }
                        </>
                    )
                    :
                    (
                        <button className='headerButton profile'>
                            <Icon.PersonSquare />
                        </button>
                        
                    )}
            </div>
            <div className='dataSide'>
                <h2>CarDex</h2>
                <h4>about</h4>
			</div>
        </>
    )
}