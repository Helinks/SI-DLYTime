const daysContainer = document.querySelector(".dias"),
nextBtn = document.querySelector(".next-btn"),
prevBtn = document.querySelector(".prev-btn"),
month = document.querySelector(".mes"),
todayBtn=document.querySelector(".today-btn"); 

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Marzo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const days = ["Dom","Lun","Mar","Mie","Jue","vie","Sab"];
const date = new Date();

let currentMonth = date.getMonth();

let currentYear = date.getFullYear();

function renderCalendar(){
    date.setDate(1); 
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1; 
    
    month.innerHTML = ` ${months[currentMonth]} ${currentYear}`;

    let days = ""; 
    
    for(let x = firstDay.getDay(); x > 0; x--){
        days +=`<div class="dia prev">${prevLastDayDate - x + 1} </div>`
    }

   

    for(let i = 1;i<=lastDayDate; i++ ){
        if(
            i === new Date().getDate() &&
            currentMonth === new Date().getMonth()  && 
            currentYear ===  new Date().getFullYear()
        ){
            days += `<div class="dia today">${i}</div>`;
        }else{
            days +=`<div class="dia">${i}</div>`;
        }
    }

    for(let j =1; j<=nextDays;j++){

        days += `<div class="dia sig">${j}</div>`;
    }

    hideTodayBtn();
    daysContainer.innerHTML = days;

}

renderCalendar();

nextBtn.addEventListener("click", () => {
    currentMonth++;
    if(currentMonth >11){
        currentMonth = 0;
        currentYear++; 
    }
    renderCalendar();
});

prevBtn.addEventListener("click", () =>{
    currentMonth--;
    if(currentMonth<0){
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

todayBtn.addEventListener("click", () =>{
    currentMonth= date.getMonth();
    currentYear= date.getFullYear();

    renderCalendar();
});

function hideTodayBtn(){
    if(
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
    ){
        todayBtn.style.display = "none";
    }else{
        todayBtn.style.display = "flex";
    }
}

