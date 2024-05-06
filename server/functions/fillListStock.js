import mongoose from "mongoose";
import DBGame from "../model/DBGame.js";

const GameData = mongoose.model("DBGame", DBGame)

let listStock = []

export default function fillListStock(currentRound, role) {
    listStock=[]
    for (var i=0; i<=currentRound; i++){
        listStock.push(role[i].stock)
    }
    return listStock
}