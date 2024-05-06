import mongoose from "mongoose";
import DBGame from "../model/DBGame.js";

const GameData = mongoose.model("DBGame", DBGame)

let listCommande = []

export default function fillListCommande(currentRound, role) {
    listCommande=[]
    for (var i=0; i<=currentRound; i++){
        listCommande.push(role[i].order)
    }
    return listCommande
}