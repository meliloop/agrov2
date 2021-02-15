import React from "react"

const BackgroundImage = ({path,alt}) => {
    return (
        <div className="image-background">
            <img src={path} alt={alt} />
        </div>
    )
}

export default BackgroundImage