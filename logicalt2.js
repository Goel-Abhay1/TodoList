let input = document.querySelector("input")
let submit = document.querySelector("button")

let parentContainer = document.querySelector("#parent-container");
let taskarr = []
submit.addEventListener("click",processing)
input.addEventListener("keyup",(event)=>{
    if(event.key=="Enter"){
        processing()
    }
})
function updateCards(){
    parentContainer.innerHTML = ""
    taskarr.forEach((element,index)=>{
        parentContainer.appendChild(elementCreator(element["task"],index))
    })
}
function processing(){
    if(input.value.trim()!=""){
        taskarr.push({
            task : input.value,
            isCompleted : false,
            ifDelete : false
        })
        updateCards()
        input.value=""
    }
    

}

function elementCreator(text,index){
    let newEl = document.createElement("div");
    newEl.classList.add("flex","border-2", "border-red-400")
    let taskpara = document.createElement("p")
    taskpara.classList.add("flex-1","m-2")
    taskpara.innerText = `${text}`
    let toggleChck = document.createElement("input")
    toggleChck.type="checkbox"
    toggleChck.classList.add("m-2")
    let deletion = document.createElement("button")
    deletion.innerHTML = `<i class="fa-solid fa-trash-can  m-2 mt-2"></i>`


    if(taskarr[index]["isCompleted"] == true){
        taskpara.classList.add("line-through")
        toggleChck.checked = true;
    }else{
        taskpara.classList.remove("line-through")
    }
    
    
    toggleChck.addEventListener("change", () => {
        if(toggleChck.checked){
            taskarr[index]["isCompleted"] = true
        }
        else{
            taskarr[index]["isCompleted"] = false
        }
        updateCards()
      });
    deletion.addEventListener("click",()=>{
        taskarr.splice(findIndexByTaskName(text),1);
        updateCards()
    })
    newEl.appendChild(taskpara)
    newEl.appendChild(toggleChck)
    newEl.appendChild(deletion)
    return newEl;
}
function findIndexByTaskName(taskName) {
    return taskarr.findIndex(task => task.task === taskName);
}