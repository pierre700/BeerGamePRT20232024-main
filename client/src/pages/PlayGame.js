import "../styles/pages/PlayGame.css"
import InputField from "../components/form/InputField"
import checkIfStringIsValid from "../lib/checkIfStringIsValid"
import {useEffect, useState} from "react"
import Tile from "../components/Tile"
import React from 'react'
import 'chart.js/auto'
import { Line, defaults } from 'react-chartjs-2'
import Button from "../components/form/Button";




function PlayGame(props) {

    const gameCode = JSON.parse(localStorage.getItem("room")) //Code du jeu
    const selectedRole = JSON.parse(localStorage.getItem("role")) //Rôle de jeu choisi
    // ==> 1: Producteur | 2: Distributeur | 3: Grossiste | 4: Détaillant | 5: Maitre du Jeu

    const socket = props.socketId
      


    const [orderValue, setOrderValue] = useState("") //Commande
    const [producerDelay, setProducerDelay] = useState("")
    const [distributorDelay, setDistributorDelay] = useState("")
    const [wholesalerDelay, setWholesalerDelay] = useState("")
    const [retailerDelay, setRetailerDelay] = useState("")
    const [consommation, setConsommation] = useState("")
    const [inputActive, setInputActive] = useState(true) //Active ou désactive le champ de saisie de la commande
    const [currentRoomSize, setCurrentRoomSize] = useState(0) //Joueurs actuels dans le jeu
    const [currentRoomRoles, setCurrentRoomRoles] = useState([]) //Rôles déjà occupés

    const [gameRounds, setGameRounds] = useState(0) //Tours de jeu (total)
    const [currentRound, setCurrentRound] = useState(0) //Tour de jeu actuel
    const [stock, setStock] = useState(0) //Inventaire
    const [stock1, setStock1] = useState(0)
    const [stock2, setStock2] = useState(0)
    const [stock3, setStock3] = useState(0)
    const [stock4, setStock4] = useState(0)
    const [listStock, setListStock] = useState([])
    const [listRupture, setListRupture] = useState([])
    const [listCommande, setListCommande] = useState([])
    const [listDemande, setListDemande] = useState([])
    const [listMoy, setListMoy] = useState([])
    const [listLissage, setListLissage] = useState([])
    const [stockNext, setStockNext] = useState([])
    const [stockNext2, setStockNext2] = useState([])
    const [retard, setRetard] = useState(0) //Retard
    const [commRecue, setCommRecue] = useState(0)
    const [next1WeekDelivery, setNext1WeekDelivery] = useState(0) //Livraison la semaine prochaine
    const [next2WeekDelivery, setNext2WeekDelivery] = useState(0) //Livraison la semaine encore d'après
    const [supplyChainOrder, setSupplyChainOrder] = useState(0) //Demande de livraison
    const [moyenne, setMoyenne] = useState(0)
    const [lissage, setLissage] = useState([])
    const [selectedGraph, setSelectedGraph] = useState(0)

    const [inputError, setInputError] = useState(false)

    const[dataV, setDataV] = useState(0)    


    useEffect(() => {
      // Update_Player_Data: Appelé quand tout le monde a passé la commande.
      // Les données sont calculées par le serveur puis transmises aux clients
        socket.on("update_player_data", (data) => {
            setDataV(data)
            console.log("Appele UpdatePlayer")
            console.log(data)
            setCurrentRound(data.roundData.currentRound)
            console.log(data.roundData.currentRound)
            setInputActive(true)
            if(selectedRole === 1) {
                setStock(data.roundData.producer[data.roundData.currentRound-1].stock)
                setListStock(data.roundData.producer[data.roundData.currentRound-1].listStock)
                setListRupture(data.roundData.producer[data.roundData.currentRound-1].listRupture)
                setListCommande(data.roundData.producer[data.roundData.currentRound-1].listCommande)
                setListDemande(data.roundData.producer[data.roundData.currentRound-1].listDemande)
                setListMoy(data.roundData.producer[data.roundData.currentRound-1].listMoy)
                setListLissage(data.roundData.producer[data.roundData.currentRound-1].listLissage)
                setRetard(data.roundData.producer[data.roundData.currentRound-1].retard)
                setNext1WeekDelivery(data.roundData.producer[data.roundData.currentRound-1].next1Week)
                setNext2WeekDelivery(data.roundData.producer[data.roundData.currentRound-1].next2Week)
                setSupplyChainOrder(data.roundData.distributor[data.roundData.currentRound-1].order)
                setStockNext(data.roundData.producer[data.roundData.currentRound-1].receptionNext)
                setStockNext2(data.roundData.distributor[data.roundData.currentRound-1].receptionNext)
                setCommRecue(data.roundData.producer[data.roundData.currentRound-1].receptionReel)
                setMoyenne(data.roundData.producer[data.roundData.currentRound-1].moyenne)
                setLissage(data.roundData.producer[data.roundData.currentRound-1].lissage)

            }
            else if(selectedRole === 2) {
                setStock(data.roundData.distributor[data.roundData.currentRound-1].stock)
                setListStock(data.roundData.distributor[data.roundData.currentRound-1].listStock)
                setListRupture(data.roundData.distributor[data.roundData.currentRound-1].listRupture)
                setListCommande(data.roundData.distributor[data.roundData.currentRound-1].listCommande)
                setListDemande(data.roundData.distributor[data.roundData.currentRound-1].listDemande)
                setListMoy(data.roundData.distributor[data.roundData.currentRound-1].listMoy)
                setListLissage(data.roundData.distributor[data.roundData.currentRound-1].listLissage)
                setRetard(data.roundData.distributor[data.roundData.currentRound-1].retard)
                setNext1WeekDelivery(data.roundData.distributor[data.roundData.currentRound-1].next1Week)
                setNext2WeekDelivery(data.roundData.distributor[data.roundData.currentRound-1].next2Week)
                setSupplyChainOrder(data.roundData.wholesaler[data.roundData.currentRound-1].order)
                setStockNext(data.roundData.distributor[data.roundData.currentRound-1].receptionNext)
                setStockNext2(data.roundData.wholesaler[data.roundData.currentRound-1].receptionNext)
                setCommRecue(data.roundData.distributor[data.roundData.currentRound-1].receptionReel)
                setMoyenne(data.roundData.distributor[data.roundData.currentRound-1].moyenne)
                setLissage(data.roundData.distributor[data.roundData.currentRound-1].lissage)
            }
            else if(selectedRole === 3) {
                setStock(data.roundData.wholesaler[data.roundData.currentRound-1].stock)
                setListStock(data.roundData.wholesaler[data.roundData.currentRound-1].listStock)
                setListRupture(data.roundData.wholesaler[data.roundData.currentRound-1].listRupture)
                setListCommande(data.roundData.wholesaler[data.roundData.currentRound-1].listCommande)
                setListDemande(data.roundData.wholesaler[data.roundData.currentRound-1].listDemande)
                setListMoy(data.roundData.wholesaler[data.roundData.currentRound-1].listMoy)
                setListLissage(data.roundData.wholesaler[data.roundData.currentRound-1].listLissage)
                setRetard(data.roundData.wholesaler[data.roundData.currentRound-1].retard)
                setNext1WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound-1].next1Week)
                setNext2WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound-1].next2Week)
                setSupplyChainOrder(data.roundData.retailer[data.roundData.currentRound-1].order)
                setStockNext(data.roundData.wholesaler[data.roundData.currentRound-1].receptionNext)
                setStockNext2(data.roundData.retailer[data.roundData.currentRound-1].receptionNext)
                setCommRecue(data.roundData.wholesaler[data.roundData.currentRound-1].receptionReel)
                setMoyenne(data.roundData.wholesaler[data.roundData.currentRound-1].moyenne)
                setLissage(data.roundData.wholesaler[data.roundData.currentRound-1].lissage)
            }
            else if(selectedRole ===4) {
                setStock(data.roundData.retailer[data.roundData.currentRound-1].stock)
                setListStock(data.roundData.retailer[data.roundData.currentRound-1].listStock)
                setListRupture(data.roundData.retailer[data.roundData.currentRound-1].listRupture)
                setListCommande(data.roundData.retailer[data.roundData.currentRound-1].listCommande)
                setListDemande(data.roundData.retailer[data.roundData.currentRound-1].listDemande)
                setListMoy(data.roundData.retailer[data.roundData.currentRound-1].listMoy)
                setListLissage(data.roundData.retailer[data.roundData.currentRound-1].listLissage)
                setRetard(data.roundData.retailer[data.roundData.currentRound-1].retard)
                setNext1WeekDelivery(data.roundData.retailer[data.roundData.currentRound-1].next1Week)
                setNext2WeekDelivery(data.roundData.retailer[data.roundData.currentRound-1].next2Week)
                setSupplyChainOrder(data.roundData.demandClient)
                setStockNext(data.roundData.retailer[data.roundData.currentRound-1].receptionNext)
                setCommRecue(data.roundData.retailer[data.roundData.currentRound-1].receptionReel)
                setMoyenne(data.roundData.retailer[data.roundData.currentRound-1].moyenne)
                setLissage(data.roundData.retailer[data.roundData.currentRound-1].lissage)
                }
            else {
                setStock1(data.roundData.producer[data.roundData.currentRound-1].stock)
                setStock2(data.roundData.distributor[data.roundData.currentRound-1].stock)
                setStock3(data.roundData.wholesaler[data.roundData.currentRound-1].stock)
                setStock4(data.roundData.retailer[data.roundData.currentRound-1].stock)
            }

            
        })

        socket.on("initial_data", (data) => {
            console.log(data)
            setGameRounds(data.gameSettings.rounds)
            setStock(data.gameSettings.startStock)
            setStock1(data.gameSettings.startStock)
            setStock2(data.gameSettings.startStock)
            setStock3(data.gameSettings.startStock)
            setStock4(data.gameSettings.startStock)
            setListStock([data.gameSettings.startStock])
            setListRupture([0])
            setListCommande([0])
            setListDemande([0])
            setListMoy([0])
            setListLissage([10])
            setCommRecue(0)
            setStockNext([0, 0, 0, 0])
            setStockNext2([0, 0, 0, 0])
            setMoyenne("En attente")
            setLissage([10, 10])
        })


        socket.on("update_room_size", (data) => {
            setCurrentRoomSize(data.roomSize)
            setCurrentRoomRoles(data.selectedRoles)
        })
    })

    let listRound = []
    for (let i=0; i <= gameRounds; i++){listRound.push(i)}

    function submitOrder() {
        if (checkIfStringIsValid(orderValue, "numeric")){
            setInputActive(false)
            socket.emit("game_update", {
                gameCode,
                selectedRole,
                orderValue
            })
        setOrderValue("")
        }
        else {
            alert("Vous devez choisir une quantité à commander ")
            setInputError(true)
        }
    }

    function submitDelay() {
        if (checkIfStringIsValid(producerDelay, "numeric") && checkIfStringIsValid(distributorDelay, "numeric") && checkIfStringIsValid(wholesalerDelay, "numeric") && checkIfStringIsValid(retailerDelay, "numeric") && checkIfStringIsValid(consommation, "numeric")){
            setInputActive(false)
            socket.emit("game_update", {
                gameCode, 
                selectedRole,
                producerDelay,
                distributorDelay,
                wholesalerDelay,
                retailerDelay,
                consommation
            })
            setProducerDelay("")
            setDistributorDelay("")
            setWholesalerDelay("")
            setRetailerDelay("")
            setConsommation("")
        }
        else{
            alert("Vous devez choisir des délais valides ")
            setInputError(true)
        }
    }

    if(currentRoomSize < 5) {
        return (
            <div>
                <div className={"grid_play"}>
                    <div className={"playground"}>
                        <h2>En attente de coéquipiers</h2>
                        <p>Sont en ce moment <b>{ currentRoomSize }</b> sur <b>5</b> joueurs dans le hall.</p>
                        <p>======================== Les rôles suivants sont occupés ========================</p>
                        { currentRoomRoles.map(element => {
                            return <p key={element}>{element}</p>
                        }) }
                    </div>
                </div>
            </div>
        )
    }
    else {
        if(currentRound<=gameRounds){
        let orderInputAndButton = <></>
        let delayInputAndButton = <></>
        let toSend = <></>
        let graph = <></>
        let graph1 = <></>
        let graph2 = <></>
        let graph3 = <></>
        let graph4 = <></>
        let graph5 = <></>
        let graph6 = <></>
        if(inputActive) {
            delayInputAndButton = (
                <>
                    <InputField
                        name={"producerDelay"}
                        getValue={setProducerDelay}
                        setValue={producerDelay}
                        description={"Allowed Characters: 0-9"}
                    />
                    <InputField
                        name={"distributorDelay"}
                        getValue={setDistributorDelay}
                        setValue={distributorDelay}
                        description={"Allowed Characters: 0-9"}
                    />
                    <InputField
                        name={"wholesalerDelay"}
                        getValue={setWholesalerDelay}
                        setValue={wholesalerDelay}
                        description={"Allowed Characters: 0-9"}
                    />
                    <InputField
                        name={"retailerDelay"}
                        getValue={setRetailerDelay}
                        setValue={retailerDelay}
                        description={"Allowed Characters: 0-9"}
                    />
                    <InputField
                        name={"Conso en %"}
                        getValue={setConsommation}
                        setValue={consommation}
                        description={"Allowed Characters: 0-9"}
                    />
                    <Button onClick={submitDelay}>Valider</Button>
                </>
            )
            orderInputAndButton = (
                <>
                    <InputField
                        name={"OrderQuantity"}
                        getValue={setOrderValue}
                        setValue={orderValue}
                        description={"Allowed Characters: 0-9"}
                    />
                    <Button onClick={submitOrder}>Commande</Button>
                </>
            )
        }
        else {
            delayInputAndButton = (
                <>
                    <InputField
                        name={"producerDelay"}
                        getValue={setProducerDelay}
                        setValue={producerDelay}
                        description={"Allowed Characters: 0-9"}
                        disabled={true}
                    />
                    <InputField
                        name={"distributorDelay"}
                        getValue={setDistributorDelay}
                        setValue={distributorDelay}
                        description={"Allowed Characters: 0-9"}
                        disabled={true}
                    />
                    <InputField
                        name={"wholesalerDelay"}
                        getValue={setWholesalerDelay}
                        setValue={wholesalerDelay}
                        description={"Allowed Characters: 0-9"}
                        disabled={true}
                    />
                    <InputField
                        name={"retailerDelay"}
                        getValue={setRetailerDelay}
                        setValue={retailerDelay}
                        description={"Allowed Characters: 0-9"}
                        disabled={true}
                    />
                    <InputField
                        name={"Conso en %"}
                        getValue={setConsommation}
                        setValue={consommation}
                        description={"Allowed Characters: 0-9"}
                        disabled={true}
                    />
                    <Button onClick={submitDelay}>Valider</Button>
                </>
            )
            orderInputAndButton = (
                <>
                    <InputField
                        name={"OrderQuantity"}
                        getValue={setOrderValue}
                        setValue={orderValue}
                        description={"Caractères autorisés: 0-9"}
                        disabled={true}
                    />
                    <Button 
                    onClick={submitOrder}
                    name={"OrderQuantityButton"}
                    >Commande</Button>
                </>
            )
        }
        if(selectedRole <= 4){
            toSend = (
                <>
                <div className={"line"} />
                        <span>A Envoyé :</span>
                        <div className={"next_products"}>
                            <span>Envoie : {stockNext2[0]}</span>
                            <span>1 Semaine : {stockNext2[1]}</span>
                            <span>2 Semaine : {stockNext2[2]}</span>
                            <span>3 Semaine : {stockNext2[3]}</span>
                        </div>
                </>
            )
            graph1 = (
                <>
                <div>
                <Line
                    data={{
                    labels: listRound,
                    datasets: [
                        {
                        label: 'Stock en unité',
                        data: listStock,
                        },
                    ],
                    }}
                />
                </div>
                </>
            )
            graph2 = (
                <>
                <div>
                <Line
                    data={{
                    labels: listRound,
                    datasets: [
                        {
                        label: 'Rupture de stock en unité',
                        data: listRupture,
                        },
                    ],
                    }}
                />
                </div>
                </>
            )
            graph3 = (
                <>
                <div>
                <Line
                    data={{
                    labels: listRound,
                    datasets: [
                        {
                        label: 'Commande auprès du fournisseur en unité',
                        data: listCommande,
                        },
                    ],
                    }}
                />
                </div>
                </>
            )
            graph4 = (
                <>
                <div>
                <Line
                    data={{
                    labels: listRound,
                    datasets: [
                        {
                        label: 'Demande du client en unité',
                        data: listDemande,
                        },
                    ],
                    }}
                />
                </div>
                </>
            )
            graph5 = (
                <>
                <div>
                <Line
                    data={{
                    labels: listRound,
                    datasets: [
                        {
                        label: 'Moyenne des demade du client sur les 4 derniers tours en unité',
                        data: listMoy,
                        },
                    ],
                    }}
                />
                </div>
                </>
            )
            graph6 = (
                <>
                <div>
                <Line
                    data={{
                    labels: listRound,
                    datasets: [
                        {
                        label: 'Lissage exponentielle de la demande du client en unité',
                        data: listLissage,
                        },
                    ],
                    }}
                />
                </div>
                </>
            )
            if (selectedGraph === 1){ graph = graph1}
            else if (selectedGraph === 2){ graph = graph2}
            else if (selectedGraph === 3){ graph = graph3}
            else if (selectedGraph === 4){ graph = graph4}
            else if (selectedGraph === 5){ graph = graph5}
            else if (selectedGraph === 6){ graph = graph6}
            else { graph = (<></>)}

        }
        else{
            toSend = (
                <>
                <div className={"line"} />
                        <span>A Envoyé :</span>
                        <div className={"next_products"}>
                            <span>Envoi : {supplyChainOrder}</span>
                        </div>
                </>
            )
        }

        let roleIcon = <></>
        let roleName = ""
        if(selectedRole === 1) {
            roleIcon = "/icons/factory.svg"
            roleName = "Producteur"
        }
        else if(selectedRole === 2) {
            roleIcon = "/icons/box.svg"
            roleName = "Distributeur"
        }
        else if(selectedRole === 3) {
            roleIcon = "/icons/wholesale.svg"
            roleName = "Grossiste"
        }
        else if(selectedRole === 4) {
            roleIcon = "/icons/shop.svg"
            roleName = "Détaillant"
        }
        else if(selectedRole === 5) {
            roleIcon = "/icons/GM.svg"
            roleName = "maitre du jeu"
        }

        function endGameBtn()
        {
            console.log("End Game")
            setCurrentRound(gameRounds+1)
        }
        if(selectedRole === 5){
            return (
                <div>
                  <div className={"grid_play"}>
                    <div className={"playground"}>
                        <div className={"timer"}>
                            <p>Tour {currentRound}/{gameRounds}</p>
                        </div>
                        <div className={"wrapper_img"}>
                            <img src={roleIcon} alt={"Icon"} />
                            <span>{roleName}</span>
                        </div>
                        <div className={"line"} />
                        <div className={"new_delay"}>
                            <span>Nouveaux délais :</span>
                            { delayInputAndButton }
                        </div>
                        <div className={"etat_stock"}>
                            <span>Stock </span>
                            <span>Producteur: {stock1} </span>
                            <span>Distributeur: {stock2} </span>
                            <span>Grossiste: {stock3} </span>
                            <span>Détaillant: {stock4} </span>
                        </div>
                        <div className={"line"} />
                    </div>
                  </div>
                </div>
              );
        }
        else {
            return (
                    <div>
                        <div className={"grid_play"}>
                            <div className={"playground"}>
                                <div className={"timer"}>
                                    <p>Tour {currentRound}/{gameRounds}</p>
                                </div>
                                <div className={"wrapper_img"}>
                                    <img src={roleIcon} alt={"Icon"} />
                                    <span>{roleName}</span>
                                </div>
                                <div className={"line"} />
                                <div className={"wrapper_1"}>
                                    <span>Stock : { stock }</span>
                                    <span>Retard : { retard }</span>
                                </div>
                                <div className={"line"} />
                                <div className={"new_order"}>
                                    <span>Nouvel ordre :</span>
                                    { orderInputAndButton }
                                </div>
                                <div className={"line"} />
                                <span>A recevoir :</span>
                                <div className={"next_products"}>
                                    <span>Reception : {stockNext[0]}</span>
                                    <span>1 Semaine : {stockNext[1]}</span>
                                    <span>2 Semaine : {stockNext[2]}</span>
                                    <span>3 Semaine : {stockNext[3]}</span>
                                </div>
                                {toSend}
                                <div className={"line"} />
                                <div className={"delivery"}>
                                    <span>Reception Réel : {commRecue}</span>
                                </div>
                                <div className={"line"} />
                                <span>Aide à la décision : </span>
                                <div class="aide_decision" >
                                    <span>Moyenne : {moyenne}</span>
                                    <span>Lissage exponentielle : {lissage[0]} ou {lissage[1]} </span>
                                    <span>(De la demande)</span>
                                    <span>(De la demande)</span>
                                </div>
                            </div>
                        </div>
                        

                        <div>&nbsp;</div>

                        <div className={"grid_play3"}>
                            <div className={"playground3"}>
                                <div className={"select_graph"}>
                                <Tile 
                                    name={"graph1"}
                                    imgSrc={"/icons/stockage_image.svg"}
                                    imgAlt={"New Game"}
                                    idKey={1}
                                    getValue={setSelectedGraph}
                                    currentSelected={selectedGraph}
                                >Graphique des stocks</Tile>
                                <Tile   
                                    name={"graph2"}                            
                                    imgSrc={"/icons/rupture_image.svg"}
                                    imgAlt={"New Game"}
                                    idKey={2}
                                    getValue={setSelectedGraph}
                                    currentSelected={selectedGraph}
                                >Graphique des ruptures de stock</Tile>
                                <Tile      
                                    name={"graph3"}                       
                                    imgSrc={"/icons/commande_image.svg"}
                                    imgAlt={"New Game"}
                                    idKey={3}
                                    getValue={setSelectedGraph}
                                    currentSelected={selectedGraph}
                                >Graphique des commandes au fournisseur</Tile>
                                <Tile       
                                    name={"graph4"}                       
                                    imgSrc={"/icons/demande_image.svg"}
                                    imgAlt={"New Game"}
                                    idKey={4}
                                    getValue={setSelectedGraph}
                                    currentSelected={selectedGraph}
                                >Graphique des demandes du client</Tile>
                                <Tile       
                                    name={"graph5"}                       
                                    imgSrc={"/icons/moyenne_image.svg"}
                                    imgAlt={"New Game"}
                                    idKey={5}
                                    getValue={setSelectedGraph}
                                    currentSelected={selectedGraph}
                                >Moyenne des demandes</Tile>
                                <Tile       
                                    name={"graph6"}                       
                                    imgSrc={"/icons/lissage_image.svg"}
                                    imgAlt={"New Game"}
                                    idKey={6}
                                    getValue={setSelectedGraph}
                                    currentSelected={selectedGraph}
                                >Lissage exponentielle des demandes</Tile>
                                </div>
                                { graph }
                            </div>
                        </div>

                        <div>&nbsp;</div>

                        <div className={"grid_play2"}>
                            <div className={"playground2"}>
                                <div className={"KPItable"}>
                                    <Button onClick={endGameBtn}>Finir la partie</Button>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        }
    }
    
    else{
        function exportData(){
            console.log("Exporting data")
            socket.emit("endGame",{dataV})
        }
        return (
        <div>
        <span>La partie est finie !</span>
        <br />
        <Button onClick={exportData}>Exporter les données</Button>
        <br />
        <span>(Le fichier sera disponible sur le serveur hébergeur, dans le dossier "server", sous le nom de "export.xlsx")</span>
        </div>
        )
    }
    
}

}


export default PlayGame
