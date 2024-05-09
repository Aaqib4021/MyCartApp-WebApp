import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL:"https://cartapp-e8bbd-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const shoppingListInDB=ref(database,"shoppingList")

const addCart=document.getElementById("add-btn")
const inputGiven=document.getElementById("input-fld");
const list=document.getElementById("shopping-list")


onValue(shoppingListInDB,function(snapshots){
    if(snapshots.exists()){
        let itemsArray=Object.entries(snapshots.val())
        clearShoppingList()
        for(let i=0;i<itemsArray.length;i++){
            let currentItem=itemsArray[i]
            let currentItemID=currentItem[0]
            let currentItemValue=currentItem[1]
            appendingItemsToList(currentItem)
        }
    }
    else{
        list.innerHTML=`<p>No Items Here...</p>`
    }
})

addCart.addEventListener("click",function(){
    let inputValue=inputGiven.value
    if(inputValue!==""){
        push(shoppingListInDB,inputValue)
        console.log(inputValue+" Added To The Database")
        clearInputField()
    }
   
})

function clearShoppingList(){
    list.innerHTML=""
}
function clearInputField(){
    inputGiven.value=""
}
function appendingItemsToList(item){
    let itemId=item[0]
    let itemValue=item[1]
    let elementCreated=document.createElement("li")
    elementCreated.textContent+=itemValue
    list.append(elementCreated)
    elementCreated.addEventListener("dblclick",function(){
        let exactLocation=ref(database,`shoppingList/${itemId}`)
        remove(exactLocation)
    })
}