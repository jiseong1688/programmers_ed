import React, { useState } from "react";

const MapTest = () =>{
    const fruits = ['apple','banana','orange'];

    return(
        <div>
            <h2>과일</h2>
            <ul>{
                    fruits.map((firut, idx)=>{
                        return (<li key={idx}>{firut}</li>)
                    })
                }
            </ul>
        </div>
    )
}

export default MapTest