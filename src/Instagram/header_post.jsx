import React from "react";
import "./header_post.css"

function Header_post({title}){
    return (
        <div className="header_post">
            <div className="title">
                <p>{title}</p>
            </div>
        </div>
    )
}

export default Header_post