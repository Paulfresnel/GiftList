import { useState } from "react"
import axios from "axios";
import niceList from "../utils/niceList.json";
import MerkleTree from "../utils/MerkleTree";
const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);


function HomePage(){
    const [name, setName] = useState('');
    const [giftMessage, setGiftMessage] = useState('')

    const tryClaim = async (e) =>{
        e.preventDefault();
        const nameIndex = niceList.findIndex(n=> n === name );
        const merkleProof = merkleTree.getProof(nameIndex);
        try{

            const { data: gift } = await axios.post(`${serverUrl}/gift`, {
            name, merkleProof
            });
            console.log({ gift });
            setGiftMessage(gift)
            setTimeout(()=>{
                setGiftMessage('');
            },1500)


        } catch(err){
            console.log("catched error:", err);
        }
    }

    return(
        <div>
        <h1>Claim your Gift</h1>
        <p>Through Merkle Tree verification, we ensure only the right 
        people that subscribed to this raffle can claim their gifts</p>
        <h2>Write your name below to check your eligibility:</h2>
        <div style={{margin:"0 auto",width:"500px",display:"flex", flexDirection:"column",alignItems:'center', justifyContent:"space-around"}}>
            <input placeholder="write your name here.." onChange={(e)=>setName(e.target.value)}></input>
            {name.length>5 && <button onClick={(e)=>tryClaim(e)}>Claim</button>}
        </div>
        {giftMessage.length>2 && <p>{giftMessage}</p>}
        </div>
    )
}

export default HomePage