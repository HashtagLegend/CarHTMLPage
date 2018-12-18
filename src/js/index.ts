import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index"

interface iCar {
    brand: string;
    model: string;
    id: number;
    year: string;

}

const azureUri: string = "https://carwebs3rvice.azurewebsites.net/api/car/"

let AllCarTable: HTMLTableElement = document.getElementById("carTable") as HTMLTableElement
let CarByIdTable: HTMLTableElement = document.getElementById("carByIdTable") as HTMLTableElement

let getCarsButton: HTMLButtonElement = document.getElementById("getAllCarsButton") as HTMLButtonElement
getCarsButton.addEventListener("click", getAllCars)

let getCarByIdButton: HTMLButtonElement = document.getElementById("getCarIdButton") as HTMLButtonElement;
getCarByIdButton.addEventListener("click", getCarById)

let createCarButton: HTMLButtonElement = document.getElementById("createCar") as HTMLButtonElement
createCarButton.addEventListener("click", createCar)

let deleteCarButton: HTMLButtonElement = document.getElementById("deleteCar") as HTMLButtonElement
deleteCarButton.addEventListener("click", deleteCar)

let updateCarButton: HTMLButtonElement = document.getElementById("updateCar") as HTMLButtonElement
updateCarButton.addEventListener("click", updateCar)

function getAllCars(){
    clearRow(AllCarTable)
    axios.get<iCar[]>(azureUri)
    .then(function(response: AxiosResponse<iCar[]>): void{
        response.data.forEach((car:iCar) => {

            insertIntoTable(car, AllCarTable)
        })

    })

    .catch(function (error: AxiosError): void {
        if(error.response) {
            var newrow = AllCarTable.insertRow(1);
            var nulltext = newrow.insertCell(0);
            nulltext.innerHTML = error.message;
        }
    })
}  

function getCarById(): void {
    clearRow(CarByIdTable)
    let carId: HTMLInputElement = document.getElementById("carId") as HTMLInputElement
    let newUri = azureUri + carId.value

    axios.get<iCar>(newUri)
       .then(function(response){
        
        insertIntoTable(response.data, CarByIdTable)
      })

}

function createCar(): void {
    
    let myBrandElm: HTMLInputElement = document.getElementById("brand") as HTMLInputElement
    let myModelElm: HTMLInputElement = document.getElementById("model") as HTMLInputElement
    let myYearElm: HTMLInputElement = document.getElementById("year") as HTMLInputElement
    let statusBar: HTMLParagraphElement = document.getElementById("statusBar") as HTMLParagraphElement

    let myBrand: string = myBrandElm.value
    let myModel: string = myModelElm.value
    let myYear: number = +myYearElm.value
    
    axios.post<iCar>(azureUri, {brand: myBrand, model: myModel, year: myYear})
        .then((response: AxiosResponse) => {statusBar.innerHTML = (response.status + " " + response.statusText + " Bil tilføjet")})
      
      .catch(function(error: AxiosError):void {
          statusBar.innerHTML = error.message;
      })
    
}

function deleteCar(): void {
    let statusBar: HTMLParagraphElement = document.getElementById("deleteStatusBar") as HTMLParagraphElement
    let carId: HTMLInputElement = document.getElementById("deleteId") as HTMLInputElement
    let newUri = azureUri + carId.value
    axios.delete(newUri)
    .then((response: AxiosResponse) => {statusBar.innerHTML = (response.status + " Car deleted")})
    
}

function updateCar(): void {
    
    let carId: HTMLInputElement = document.getElementById("carUpdateId") as HTMLInputElement
    let newUri = azureUri + carId.value

    let myBrandElm: HTMLInputElement = document.getElementById("brand2") as HTMLInputElement
    let myModelElm: HTMLInputElement = document.getElementById("model2") as HTMLInputElement
    let myYearElm: HTMLInputElement = document.getElementById("year2") as HTMLInputElement
    let statusBar: HTMLParagraphElement = document.getElementById("statusBarUpdate") as HTMLParagraphElement

    let myBrand: string = myBrandElm.value
    let myModel: string = myModelElm.value
    let myYear: number = +myYearElm.value
    
    axios.put<iCar>(newUri, {brand: myBrand, model: myModel, year: myYear})
        .then((response: AxiosResponse) => {statusBar.innerHTML = (response.status + " " + response.statusText + " Bil opdateret")})
      
      .catch(function(error: AxiosError):void {
          statusBar.innerHTML = error.message;
      })
}

//Tilføjer det antal rows som der er objecter, tager et table(det table de skal indsætte i) og et iCar element som input
function insertIntoTable(input:iCar, table: HTMLTableElement){
    if(input == null)
    {
        let newrow = table.insertRow(1)
        let nulltext = newrow.insertCell(0)
        nulltext.innerHTML = "null element"
    }
    else
    {
        let newrow1 = table.insertRow()
        let id = newrow1.insertCell(0)
        let brand = newrow1.insertCell(1)
        let model = newrow1.insertCell(2)
        let year = newrow1.insertCell(3)

        id.innerHTML = input.id.toString()
        brand.innerHTML = input.brand
        model.innerHTML = input.model
        year.innerHTML = input.year
    }
}

//Sletter de gamle rows med data inden der bliver fyldt ny data i
function clearRow(table: HTMLTableElement){
    let tableLength: number = table.rows.length

    while (tableLength > 1 ){
        table.deleteRow(-1)
        tableLength--
    }    
}


//Alle biler table
let row1 = AllCarTable.insertRow(0)
let id = row1.insertCell(0)
let brand = row1.insertCell(1)
let model = row1.insertCell(2)
let year = row1.insertCell(3)

id.innerHTML = "Id"
brand.innerHTML = "Mærke"
model.innerHTML = "Model"
year.innerHTML = "Årgang"

//Søg på id table
let arow1 = CarByIdTable.insertRow(0)
let aid = arow1.insertCell(0)
let abrand = arow1.insertCell(1)
let amodel = arow1.insertCell(2)
let ayear = arow1.insertCell(3)

aid.innerHTML = "Id"
abrand.innerHTML = "Mærke"
amodel.innerHTML = "Model"
ayear.innerHTML = "Årgang"

    




