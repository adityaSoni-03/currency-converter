
const fromselect=document.getElementById("from");
const fromdiv=document.body.querySelector(".from");
const fromflag=fromdiv.querySelector("img");

const toselect=document.getElementById("to");
const todiv=document.body.querySelector(".to");
const toflag=todiv.querySelector("img");

const amount=document.body.querySelector(".amount");
const amountinput=amount.querySelector("input");
const amountvalue=amountinput.value;

const msg=document.body.querySelector(".msg");

const exchange=document.body.querySelector(".exchange");
let fromcurr;
let tocurr;

let dropdowns=document.querySelectorAll(".dropdown select");
for(let select of dropdowns){
    for(let currcode in countryList){
        let newoption=document.createElement("option");
        newoption.value=currcode;
        newoption.innerHTML=currcode;
        select.append(newoption);
    }
}


exchange.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let fromlower=fromselect.value.toLowerCase();
    let tolower=toselect.value.toLowerCase();
    let url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromlower}.json`;
    let response=await fetch(url);
    let currdataobj=await response.json();
    
    let fromcurrobj=currdataobj[`${fromlower}`];

    let amount=amountinput.value;
    console.log(amount);
    let convamount=amount*fromcurrobj[`${tolower}`];
    msg.innerHTML=`${amount} ${fromlower}= ${convamount} ${tolower}`;
    console.log(Math.floor(convamount));
    
});


fromselect.addEventListener("change",()=>{  
    showflagfrom();
})
toselect.addEventListener("change",()=>{  
    showflagto();
    
})
const showflagfrom=()=>{
    const from=fromselect.value;

    for (let key in countryList) {
        if (countryList.hasOwnProperty(key)) {
            
            if(key===from){
                let flagcode=countryList[key];
                // console.log(flagcode);
                fromflag.setAttribute("src",`https://flagsapi.com/${flagcode}/flat/64.png`);
            }   
        }
    }
}
const showflagto=()=>{
    const to=toselect.value;
    for (let key in countryList) {
        if (countryList.hasOwnProperty(key)) {
            
            if(key===to){
                let flagcode=countryList[key];
                // console.log(flagcode);
                toflag.setAttribute("src",`https://flagsapi.com/${flagcode}/flat/64.png`);
            }   
        }
    }
}