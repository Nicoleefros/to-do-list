const btnAdd = document.getElementById("btnAdd");
const inputTarea = document.getElementById("inputTareas");
const listaTareas = document.getElementById("listaTareas");
const inputSearch = document.getElementById("taskSearch");


let tareas = JSON.parse(localStorage.getItem("Tareas")) || [];

inputTarea.addEventListener( "keydown", (e) => {
    inputTarea.value.trim() ? btnAdd.removeAttribute("disabled"): btnAdd.setAttribute("disabled", true)
    if (e.key === "Enter" && inputTarea.value.trim()){agregarTarea()};
})

function renderizado(){

    if(tareas.length !=0){
        taskList.innerHTML = "";
        tareas.forEach ( (tarea, i) => {
            taskList.innerHTML += `<li id="io${i}">
                                    <div id="li${i}" class="divTareas">
                                        <input type="checkbox" onChange="tachar(${i})" id="ic${i}">
                                        ${tarea.tarea}
                                        <button onclick= "eliminar(${i})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                        </svg>
                                        </button>
                                    </div>
                                    </li>`
            if (tarea.check){
                document.getElementById(`ic${i}`).setAttribute("checked", true)
                document.getElementById(`li${i}`).classList.toggle("tachado");
            }                        
});

    if (inputSearch.value.trim()){
        search()
    }

    }else{
        taskList.innerHTML= "No tasks yet";
    }

};

function agregarTarea(){
    tareas.push( {
        tarea: inputTarea.value.trim(),
        check: false
    } );

    inputTarea.value = "";
    btnAdd.setAttribute("disabled", true)
    renderizado()
    uploadTask()
};

function tachar(n){
    document.getElementById(`li${n}`).classList.toggle("tachado");
    tareas[n].check = !tareas[n].check;
    uploadTask()
}

function eliminar(n){
    tareas.splice(n, 1);
    uploadTask();
    renderizado();
}

btnAdd.addEventListener( "click", agregarTarea);
renderizado()


setInterval(() => {
    let fecha = new Date();
    let hora = fecha.getHours() % 12 == 0 ? "12": fecha.getHours() % 12;
    let minutos = fecha.getMinutes().toString().padStart(2,"0");
    let etapa = fecha.getHours() > 11 ? "PM" : "AM";

    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    document.getElementById("sHora").innerText = `${hora}:${minutos} ${etapa}`;
    document.getElementById("sFecha").innerText = `${dia}/${mes}/${año}`;
}, 10);

function uploadTask(){
    localStorage.setItem("Tareas", JSON.stringify(tareas));
}

/* inputSearch.addEventListener("input", () => {
    tareas.forEach( (tarea, i) => {
        const siono = tarea.tarea.includes(inputSearch.value);
        document.getElementById(`li${i}`).style.display = siono ? "flex" : "none" 
    })
}) */

function search(){
    if (inputSearch.value.trim()){
        tareas.forEach( (tarea, i) => {
            const siono = tarea.tarea.toLowerCase().includes(inputSearch.value.toLowerCase())
            document.getElementById(`io${i}`).style.display = siono ? "flex" : "none";
        }) 
    }else{
        renderizado()
    }
}

inputSearch.addEventListener("input", search)

document.getElementById("btn-despliegue").addEventListener("click", () => {
    document.getElementById("options").classList.toggle("opciones-despliegue")
})


document.getElementById("btn-check").addEventListener("click", () =>{
    tareas.forEach((tarea) => {
        tarea.check = true
    })
    uploadTask();
    renderizado();
})

document.getElementById("btn-clear").addEventListener("click",() => {
    localStorage.clear();
    location.reload();
})



