//this component if for the sigup and login for the navbar
// import "./Entrance.css"
import { AuthContext } from "context/Auth"; 
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const SignOut = ({...props}) => {
    const { loggedIn, logout }  = useContext(AuthContext)
    // const navigate = useNavigate();

    return(
        <>
            {loggedIn?
                        <button
                            {...props}
                            className="btn btn-primary w-49"
                            id='signup-bttn'>SIGN OUT
                        </button>
                     : 
                    <a href="/login">
                        <button
                            className="btn btn-primary w-49"
                            id='signup-bttn'>login IN
                        </button>
                    </a>
                    
            }
        </>
    )
}
export default SignOut