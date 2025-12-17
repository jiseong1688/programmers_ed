import React, { Component } from "react";

interface MyProps{
    waether: string;
    children: React.ReactNode;
}

// const MyWeather : React.FC<MyProps> = ({children, waether}) =>{
//     // const {children, waether} = props;

//     return(
//         <div>
//             {children}<p></p>
//             오늘의 날씨는 {waether} 입니다.
//         </div>
//     )
// }

class MyWeather extends Component<MyProps>{
    render(){
    const {children, waether} = this.props;
    return (
            <div>
                {children}<p></p>
                오늘의 날씨는 {waether} 입니다.
            </div>
        )
    }
}

export default MyWeather