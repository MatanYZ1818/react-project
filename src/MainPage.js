import { useEffect, useState } from "react"


export default function MainPage(){
    const[data,setData]=useState([])

    useEffect(()=>{
        fetch(`https://api.shipap.co.il/cards?token=d2960fec-3431-11ee-b3e9-14dda9d4a5f0`, {
        credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
        setData(data)
        console.log(data);
        console.log(data[0])
    });
    },[])

    return(
        <div className="cardsContainer">
            {
                !data[0] ? (
                    <div class="business_card empty">
                        <div class="preview_wrapper">
                            <div class="preview">
                                <img />
                            </div>
                        </div>
                        <div class="business_text">
                                <h5 style={{direction:"rtl"}}>כאן יופיעו הכרטיסים שלך!</h5>
                            <p>טקסט לדוגמא כדי להראות!</p>
                        </div>
                    </div>
                )
                :
                (
                    <div class="business_card">
                        <div class="preview_wrapper">
                            <div class="preview">
                                <img />
                            </div>
                        </div>
                        <div class="business_text">
                                <h5 style={{direction:"rtl"}}>כרטיס אמיתי</h5>
                            <p>טקסט לדוגמא כדי להראות!</p>
                        </div>
                    </div>
                )
                
            }
        </div>
    )
}