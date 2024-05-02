export default function Moyenne_Lissage(roleID, currentRound, nbRound, role, nextRole, dmdCli){
    let somme = 0
    let moyAttente = "en attente"
    let moy = 0
    let liss = [Number(role[currentRound].lissage[0]), Number(role[currentRound].lissage[1])]
    let alpha1 = 0.1
    let alpha2 = 0.2

    if(currentRound < nbRound){
        moyAttente = "en attente"
        if (roleID === 4){
            liss = [liss[0] + alpha1 * (dmdCli[currentRound] - liss[0]), liss[1] + alpha2 * (dmdCli[currentRound] - liss[1])]
        }
        else{
            liss = [liss[0] + alpha1 * (nextRole[currentRound].order - liss[0]), liss[1] + alpha2 * (nextRole[currentRound].order - liss[1])] 
        }
        console.log("moyenne", moyAttente, "lissage", liss)
        role[currentRound].moyenne = moyAttente
        role[currentRound].lissage = [liss[0].toFixed(2), liss[1].toFixed(2)]
    } 
    else{
        if(roleID === 4){
            for (var i = currentRound-nbRound; i < currentRound; i++){
                somme = somme + dmdCli[i]
            }
            moy = somme / nbRound
            liss = [liss[0] + alpha1 * (dmdCli[currentRound] - liss[0]), liss[1] + alpha2 * (dmdCli[currentRound] - liss[1])] 
        }
        else{
            for (var i = currentRound-nbRound; i < currentRound; i++){
                somme = somme + nextRole[i].order
            }
            moy = somme / nbRound
            liss = [liss[0] + alpha1 * (nextRole[currentRound].order - liss[0]), liss[1] + alpha2 * (nextRole[currentRound].order - liss[1])] 
        }
        console.log("moyenne", moy, "lissage", liss)
        role[currentRound].moyenne = Number(moy).toFixed(2)
        role[currentRound].lissage = [liss[0].toFixed(2), liss[1].toFixed(2)]
    }

}