import mongoose from "mongoose";
import DBGame from "../model/DBGame.js";

const GameData = mongoose.model("DBGame", DBGame)

let listMoy = []

export default function fillListMoy(currentRound, role) {
    listMoy=[]
    for (var i=0; i<=currentRound; i++){
        listMoy.push(role[i].moyenne)
    }
    return listMoy
}