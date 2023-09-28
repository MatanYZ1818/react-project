import { useEffect, useState } from "react"
import add_card_preview from "../resources/add_cards_preview.png"

export default function MyCards(){
    const [data,setData]=useState([])
    
    fetch(`https://api.shipap.co.il/business/cards?token=d2960fec-3431-11ee-b3e9-14dda9d4a5f0`, 
    {
        credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
        setData(data)
    });

    return(
        <div className="cardsContainer">
            <div class="business_card add">
                <div class="preview_wrapper">
                    <div class="preview">
                        <img src={add_card_preview} alt="add card placeholder"/>
                    </div>
                </div>
                <div class="business_text">
                        <h4 style={{direction:"rtl"}}>הוסף כרטיס</h4>
                </div>
            </div>
        </div>
    )
}