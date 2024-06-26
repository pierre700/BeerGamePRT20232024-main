import mongoose from "mongoose";
import DBGame from "../model/DBGame.js";
import exceljs from "exceljs";
import { exec } from 'child_process';


export default function EndGame(io, socket, data) {
  const GameData = mongoose.model("DBGame", DBGame);
  const Current = new GameData(data);
  
  const workbook = new exceljs.Workbook();
  const worksheetClient = workbook.addWorksheet('Client');
  const worksheetRetailer = workbook.addWorksheet('Détaillant');
  const worksheetWholesaler = workbook.addWorksheet('Grossiste');
  const worksheetDistributor = workbook.addWorksheet('Distributeur');
  const worksheetProducer = workbook.addWorksheet('Producteur');


  console.log("EndGame.js")


  GameData.find({}, (err, data) => {
    // Ajouter l'en-tête du tableau
    worksheetClient.addRow(['Tour','DemandeClient']);
    worksheetRetailer.addRow(['Tour','Stock','Commande','Rupture','LivraisonSemaine1','LivraisonSemaine2']);
    worksheetWholesaler.addRow(['Tour','Stock','Commande','Rupture','LivraisonSemaine1','LivraisonSemaine2']);
    worksheetDistributor.addRow(['Tour','Stock','Commande','Rupture','LivraisonSemaine1','LivraisonSemaine2']);
    worksheetProducer.addRow(['Tour','Stock','Commande','Rupture','LivraisonSemaine1','LivraisonSemaine2']);
  
    let numberOfRounds = 0
    let lastGame = 0
  
    lastGame = data.length
    let roundDataLastGame = data[lastGame-1].roundData
     
    numberOfRounds = data[lastGame-1].roundData.producer.length
    for (let i = 0;i<numberOfRounds;i++){
      
      worksheetClient.addRow([i,roundDataLastGame.demandClientList[i]]);
      worksheetRetailer.addRow([i,roundDataLastGame.retailer[i].stock,roundDataLastGame.retailer[i].order,roundDataLastGame.retailer[i].retard,roundDataLastGame.retailer[i].next1Week,roundDataLastGame.retailer[i].cost])
      worksheetWholesaler.addRow([i,roundDataLastGame.wholesaler[i].stock,roundDataLastGame.wholesaler[i].order,roundDataLastGame.wholesaler[i].retard,roundDataLastGame.wholesaler[i].next1Week,roundDataLastGame.wholesaler[i].cost])
      worksheetDistributor.addRow([i,roundDataLastGame.distributor[i].stock,roundDataLastGame.distributor[i].order,roundDataLastGame.distributor[i].retard,roundDataLastGame.distributor[i].next1Week,roundDataLastGame.distributor[i].cost])
      worksheetProducer.addRow([i,roundDataLastGame.producer[i].stock,roundDataLastGame.producer[i].order,roundDataLastGame.producer[i].retard,roundDataLastGame.producer[i].next1Week,roundDataLastGame.producer[i].cost])
    }
    workbook.xlsx.writeFile('export.xlsx')
      .then(() => {
        console.log('Fichier Excel créé avec succès');
        // Exécution du script Python après la création du fichier Excel
        exec('python chart.py', (error, stdout, stderr) => {
          if (error) {
            console.error(`Erreur lors de l'exécution du script Python: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Erreur lors de l'exécution du script Python: ${stderr}`);
            return;
          }
          console.log(`Sortie du script Python: ${stdout}`);
        });
      })
      .catch((err) => console.error('Erreur lors de la création du fichier Excel', err));
  });      
}