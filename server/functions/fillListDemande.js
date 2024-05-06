import mongoose from "mongoose";
import DBGame from "../model/DBGame.js";

const GameData = mongoose.model("DBGame", DBGame)

let listDemmande = []

export default function fillListDemande(currentRound, role, ID, dmdClient) {
    listDemmande=[]
    if (ID === 4){
        for (var i=0; i<=currentRound; i++){
            listDemmande.push(dmdClient)
        }
    }
    else{
        for (var i=0; i<=currentRound; i++){
            listDemmande.push(role[i].order)
        }
    }
    return listDemmande
    
}