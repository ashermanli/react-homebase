import React from 'react'

const Bar = ({progWidth}) =>{

    return (
        <div className="bar">
            <div className="progress" style={{width:progWidth}}>
            
            </div>
        </div>
    )
}

export default Bar