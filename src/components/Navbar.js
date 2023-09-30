import { useContext,React } from "react"
import * as Icon from "react-bootstrap-icons"
import { userContext } from "../App"
import {Link} from "react-router-dom";
import "./Navbar.css"
import Logout from "../User/Logout"

export default function Navbar(){
    const {islogged,changeLight,isLight}=useContext(userContext)
    return(
        <>
            <div className='userSide'>
                {!islogged ? (
                        <>
                            <Link to="/login"><button className='headerButton login'>Login</button></Link>
                            <Link to="/signup"><button className='headerButton signup'>Signup</button></Link>
                        </>
                    ):(
                        <Logout />
                    )
                }
                    
                {isLight ? 
                    <Icon.MoonFill onClick={changeLight} class={isLight? "iii":"nightButton"}/>
                    :
                    <Icon.BrightnessHigh onClick={changeLight} class={isLight? "dayButton":""}/>
                }

            </div>
            <div className='dataSide'>
                <Link to="/"><button className='headerButton cardex'><span>CarDex</span></button></Link>
                <Link to="/about"><button className='headerButton about'><span>about</span></button></Link>
                {
                    islogged && 
                    (
                        <button className="headerButton fave"><span>favourite cards</span></button>
                    )

                }

            </div>
        </>
    )
}