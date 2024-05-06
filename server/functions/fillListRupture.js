import mongoose from "mongoose";
import DBGame from "../model/DBGame.js";

const GameData = mongoose.model("DBGame", DBGame)

let listRupture = []

export default function fillListRupture(currentRound, role) {
    listRupture=[]
    for (var i=0; i<=currentRound; i++){
        listRupture.push(role[i].retard)
    }
    return listRupture
}