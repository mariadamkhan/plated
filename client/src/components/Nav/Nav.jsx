import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss"
import Home from "../../assets/icons/home.svg";
import Upload from "../../assets/icons/upload.svg";
import User from "../../assets/icons/user.svg";
import * as CONSTANTS from "../../constants/Constants";

export default function Nav() {
    return (
        
         <nav className="nav">
             <div className="nav__container">
                 <ul className="nav__list">
                     <li className="nav__item"><Link className="nav__link"><img className="nav__icon"src={Home}/></Link></li>
                     <li className="nav__item"><Link className="nav__link"><img className="nav__icon"src={Upload}/></Link></li>
                     <li className="nav__item"><Link className="nav__link"><img className="nav__icon"src={User}/></Link></li>
                    
                 </ul>
             </div>
          
         </nav>
        
      );
}
