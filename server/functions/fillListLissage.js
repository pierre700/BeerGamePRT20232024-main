import mongoose from "mongoose";
import DBGame from "../model/DBGame.js";

const GameData = mongoose.model("DBGame", DBGame)

let listLissage = []

export default function fillListLissage(currentRound, role) {
    listLissage=[]
    for (var i=0; i<=currentRound; i++){
        listLissage.push(role[i].lissage)
    }
    return listLissage
}