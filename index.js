
let myLeads=[];
let oldLeads=[];

const inputEl=document.querySelector("#input-el");
const inputBtn=document.querySelector("#input-btn");
const ulEl=document.querySelector("#ul-el");
const delBtn=document.querySelector("#delete-btn");
const tabBtn=document.querySelector("#tab-btn");

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads);
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true ,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads); 
    })
})

function render(leads){
    let listItems="";
    for(let i=0;i<leads.length;i++){
        //we have to use innerHTML to render list items as list items 
        //shlould not use textContent to make this work
        //ulEl.innerHTML+="<li>"+myLeads[i]+"</li>";
        
        //another thing dont use innerHTML so many times in loops
        //use a variable and store and use innerhtml once
        //becoz dom manipulation come with cost

        //see the href carefully its important to understand
        //listItems+="<li><a target='_blank' href='"+myLeads[i]+"'>"+myLeads[i]+"</a></li>";
        //see below how our href works
        //console.log(listItems);

        //instead of using above we use "template strings***"
        //learn about template strings
        //*** */
        listItems+=`
            <li>
                <a target="_blank" href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>    
        `
        
        // //another method
        // //in this method we wil create the element and append it
        // const li=document.createElement("li");
        // li.textContent=myLeads[i];
        // ulEl.append(li);
    }
    
    ulEl.innerHTML=listItems;
}

delBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
})
//instead of using onclick in html we used different method which is quite used by developers
//this is best method used for this adding event to the like this function
inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value);
    inputEl.value="";
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads(myLeads );
});
