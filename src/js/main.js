const selectCountry = document.querySelector("#global-country");
const resultDiv = document.querySelector("#selected-destination");
let dashboardCountryInfoSection =document.querySelector("#dashboard-country-info-section")
document.querySelector("#global-country").value = null

let countrys = [];

selectCountry.addEventListener("click", function () {
  if (countrys.length === 0) {
    allcountry();
    // allcountryFlag()
  }
});



async function allcountry() {
  let res = await fetch("https://date.nager.at/api/v3/AvailableCountries");
  countrys = await res.json();
  display();
}

function display() {
  let cartona = ``;

  for (let i = 0; i < countrys.length; i++) {
    cartona += `
        <option value="${countrys[i].countryCode}">
        ${countrys[i].name}
      </option>
    `;
  }

  selectCountry.innerHTML = cartona;
}




selectCountry.addEventListener("change",async function () {
  let code = this.value;
  
  let selectedFlag = document.querySelector("#selected-country-flag");
  let dashboardFlag = document.querySelector(".dashboard-country-flag");
  let holidaysFLAG = document.querySelector(".selection-flag")
  let wetherFLAG = document.querySelector(".selection-flag-weather")
  let eventFLAG = document.querySelector(".selection-flag-event")
  let WEEKENDSFLAG = document.querySelector(".selection-flag-WEEKENDS")
  let sunFLAG = document.querySelector(".selection-flag-sun")

  if (!code) {
    selectedFlag.src = "";
    dashboardFlag.src = "";
    holidaysFLAG.src ="" ;
    wetherFLAG.src ="" ;
    eventFLAG.src ="" ;
    WEEKENDSFLAG.src ="" ;
    sunFLAG.src ="" ;
    return;
  }

  let flagUrl = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;



  selectedFlag.src = flagUrl;
  dashboardFlag.src = flagUrl;
  holidaysFLAG.src = flagUrl;
  wetherFLAG.src = flagUrl;
  eventFLAG.src = flagUrl;
  WEEKENDSFLAG.src = flagUrl;
  sunFLAG.src = flagUrl;

   const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();
    const dataCountry = data[0];
    // console.log(dataCountry);

    document.querySelector(".official-name").innerHTML = dataCountry.altSpellings[1]
    document.querySelector(".name").innerHTML = dataCountry.altSpellings[1]
    document.querySelector(".name-weather").innerHTML = dataCountry.altSpellings[1]
    document.querySelector(".name-event").innerHTML = dataCountry.altSpellings[1]
    document.querySelector(".name-WEEKENDS").innerHTML = dataCountry.altSpellings[1]
    document.querySelector(".name-sun-view").innerHTML = dataCountry.altSpellings[1]
    document.querySelector(".region").innerHTML =`<i class="fa-solid fa-location-dot"></i>` + dataCountry.continents + "•" +dataCountry.subregion
    document.querySelector(".capital").innerHTML = dataCountry.capital
    document.querySelector(".captil-weather").innerHTML = dataCountry.capital
    document.querySelector(".capital-event").innerHTML = dataCountry.capital
    document.querySelector(".captil-WEEKENDS").innerHTML = dataCountry.capital
    document.querySelector(".captil-sun").innerHTML = dataCountry.capital
    document.querySelector("#selected-city-name").innerHTML = dataCountry.capital
    document.querySelector(".weather-location").innerHTML =`<i class="fa-solid fa-location-dot"></i>` + dataCountry.capital
    document.querySelector(".population").innerHTML = dataCountry.population
    document.querySelector(".area").innerHTML = dataCountry.area
    document.querySelector(".continents").innerHTML = dataCountry.continents
    document.querySelector(".idd").innerHTML = dataCountry.idd           //nooooo
    document.querySelector(".startOfWeek").innerHTML = dataCountry.startOfWeek           
    let firstCurrency = Object.values(dataCountry.currencies)[0];
    let symbolCurrency = Object.values(dataCountry.currencies)[0];
    document.querySelector(".currencies").innerHTML = firstCurrency.name + symbolCurrency.symbol;

    let languagesArray = Object.values(dataCountry.languages);
    let languagesText = languagesArray.join(", ");
    document.querySelector(".languages").innerHTML = languagesText;

    document.querySelector(".btn-map-link").href = dataCountry.maps.googleMaps


    document.querySelector(".local-time-zone").innerHTML = dataCountry.timezones

    // ///////////////////////////////////////holidays-view/////////////////////////////////////////////////////////
    let holidaysCountry = [];

    async function holiday() {
      let res = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/2026/${code}`
  );

  holidaysCountry = await res.json();
  holidaysDisplay();
    }

    function holidaysDisplay() {
  let cartona = "";

  for (let i = 0; i < holidaysCountry.length; i++) {
  cartona += `
    <div class="holiday-card">
      <div class="holiday-card-header">
        <div class="holiday-date-box">
          <span class="day">${new Date(holidaysCountry[i].date).getDate()}</span>
        </div>
        <button class="holiday-action-btn">
          <i class="fa-regular heart fa-heart"></i>
        </button>
      </div>

      <h3>${holidaysCountry[i].localName}</h3>
      <p class="holiday-name">${holidaysCountry[i].name}</p>

      <div class="holiday-card-footer">
        <span class="holiday-type-badge">
          ${holidaysCountry[i].types[0]}
        </span>
      </div>
    </div>
  `;
}


  document.querySelector("#holidays-content").innerHTML = cartona;

  document.querySelector(".heart").addEventListener("click", function(){
    // div to display fovirit
  })
    }

  holiday();

// //////////////////////////////////////////weather-view/////////////////////////////////////////////////////////
let API_KEY = "cfc3f0415ab5e5376480ec9e37374563";
    let weatherCountry = [];
    async function weather() {
          let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${code}&units=metric&appid=${API_KEY}`
)
      weatherCountry = await res.json();

    }
    console.log(weatherCountry);
    

weather()
// /////////////////////////////////////////////////////////////////////////////////////////////////////////



})








selectCountry.addEventListener("change", function () {
    resultDiv.classList.remove("d-none")

  let result =
    selectCountry.options[selectCountry.selectedIndex].text;

    
  document.querySelector("#selected-country-name").innerHTML = result;
  document.querySelector("#name").innerHTML = result                      //aaaaaaaaaaaakak
  
});


document.querySelector("#global-search-btn").addEventListener("click",function(){

  let value = document.querySelector("#global-country").value 

  if( value === "" ){
      dashboardCountryInfoSection.classList.add("d-none")

  }else{
      dashboardCountryInfoSection.classList.remove("d-none")
  }  
})

document.querySelector("#clear-selection-btn").addEventListener("click",function(){
  dashboardCountryInfoSection.classList.add("d-none")
  document.querySelector("#selected-destination").classList.add("d-none")
  document.querySelector("#global-country").value = null
})


function clock (){
  let date =new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let flag = "AM"

  if(hours == 0){
    hours =12
  }
  if( hours > 12){
    hours = hours - 12;
    flag ="PM"
  }
  
  if(hours < 10) hours = "0" + hours;
  if(minutes < 10 ) minutes = "0" + minutes;
  if(seconds < 10 ) seconds = "0" + seconds;

  document.querySelector("#country-local-time").innerHTML = `${hours} : ${minutes} : ${seconds} : ${ flag} `

  setInterval(clock, 1000);
}
clock ()

///////////////////////////////////loding/////////////////////////////////////////////////

let divs = document.querySelectorAll(".Events, .Weather , .Sun-Times ");

divs.forEach(div => {
  div.addEventListener("click", function() {

    document.querySelector("#loading-overlay").classList.remove("d-none")

    setTimeout(() => {

      document.querySelector("#loading-overlay").classList.add("d-none")

    }, 500);
  });
});

///////////////////////////////////d-none/////////////////////////////////////////////////
document.querySelector(".Dashboard").addEventListener("click",function(){  
  document.querySelector("#dashboard-view").classList.remove("d-none")
  document.querySelector("#holidays-view").classList.add("d-none")
  document.querySelector("#events-view").classList.add("d-none")
  document.querySelector("#long-weekends-view").classList.add("d-none")
  document.querySelector("#currency-view").classList.add("d-none")
  document.querySelector("#sun-times-view").classList.add("d-none")
  document.querySelector("#my-plans-view").classList.add("d-none")
  document.querySelector("#weather-view").classList.add("d-none")
  document.querySelector(".Sun-Times").classList.add("d-none")
  document.querySelector(".Dashboard").classList.add("active")
  document.querySelector(".Holidays").classList.remove("active")
   document.querySelector(".Events").classList.remove("active")
   document.querySelector(".Weather").classList.remove("active")
  document.querySelector(".Long-Weekends").classList.remove("active")
  document.querySelector(".Currency").classList.remove("active")
  document.querySelector(".Sun-Times").classList.remove("active")
    document.querySelector(".My-Plans").classList.remove("active")

  
})
document.querySelector(".Holidays").addEventListener("click",function(){  
  document.querySelector("#dashboard-view").classList.add("d-none")
  document.querySelector("#events-view").classList.add("d-none")
  document.querySelector("#weather-view").classList.add("d-none")
  document.querySelector("#long-weekends-view").classList.add("d-none")
  document.querySelector("#currency-view").classList.add("d-none")
  document.querySelector("#sun-times-view").classList.add("d-none")
  document.querySelector("#my-plans-view").classList.add("d-none")

  document.querySelector("#holidays-view").classList.remove("d-none")
  document.querySelector(".Holidays").classList.add("active")
  document.querySelector(".Dashboard").classList.remove("active")
   document.querySelector(".Holidays").classList.remove("active")
   document.querySelector(".Events").classList.remove("active")
   document.querySelector(".Weather").classList.remove("active")
  document.querySelector(".Long-Weekends").classList.remove("active")
  document.querySelector(".Currency").classList.remove("active")
  document.querySelector(".Sun-Times").classList.remove("active")
    document.querySelector(".My-Plans").classList.remove("active")
})
document.querySelector(".Events").addEventListener("click",function(){  
  document.querySelector("#dashboard-view").classList.add("d-none")
  document.querySelector("#holidays-view").classList.add("d-none")
  document.querySelector("#events-view").classList.remove("d-none")
  document.querySelector("#long-weekends-view").classList.add("d-none")
  document.querySelector("#currency-view").classList.add("d-none")
  document.querySelector("#sun-times-view").classList.add("d-none")
  document.querySelector("#my-plans-view").classList.add("d-none")
  document.querySelector("#weather-view").classList.add("d-none")
  document.querySelector(".Dashboard").classList.remove("active")
  document.querySelector(".Holidays").classList.remove("active")
  document.querySelector(".Events").classList.add("active")
   document.querySelector(".Weather").classList.remove("active")
  document.querySelector(".Long-Weekends").classList.remove("active")
  document.querySelector(".Currency").classList.remove("active")
  document.querySelector(".Sun-Times").classList.remove("active")
    document.querySelector(".My-Plans").classList.remove("active")

  
})
document.querySelector(".Weather").addEventListener("click",function(){  
  document.querySelector("#dashboard-view").classList.add("d-none")
  document.querySelector("#holidays-view").classList.add("d-none")
  document.querySelector("#events-view").classList.add("d-none")
  document.querySelector("#long-weekends-view").classList.add("d-none")
  document.querySelector("#currency-view").classList.add("d-none")
  document.querySelector("#sun-times-view").classList.add("d-none")
  document.querySelector("#my-plans-view").classList.add("d-none")
  document.querySelector("#weather-view").classList.remove("d-none")
  document.querySelector(".Dashboard").classList.remove("active")
  document.querySelector(".Holidays").classList.remove("active")
  document.querySelector(".Events").classList.remove("active")
  document.querySelector(".Weather").classList.add("active")
  document.querySelector(".Long-Weekends").classList.remove("active")
  document.querySelector(".Currency").classList.remove("active")
  document.querySelector(".Sun-Times").classList.remove("active")
    document.querySelector(".My-Plans").classList.remove("active")
})
document.querySelector(".Long-Weekends").addEventListener("click",function(){  
  document.querySelector("#dashboard-view").classList.add("d-none")
  document.querySelector("#holidays-view").classList.add("d-none")
  document.querySelector("#events-view").classList.add("d-none")
  document.querySelector("#weather-view").classList.add("d-none")
  document.querySelector("#currency-view").classList.add("d-none")
  document.querySelector("#sun-times-view").classList.add("d-none")
  document.querySelector("#my-plans-view").classList.add("d-none")
  document.querySelector("#long-weekends-view").classList.remove("d-none")
  document.querySelector(".Dashboard").classList.remove("active")
  document.querySelector(".Holidays").classList.remove("active")
  document.querySelector(".Events").classList.remove("active")
  document.querySelector(".Weather").classList.remove("active")
  document.querySelector(".Long-Weekends").classList.add("active")
  document.querySelector(".Currency").classList.remove("active")
  document.querySelector(".Sun-Times").classList.remove("active")
    document.querySelector(".My-Plans").classList.remove("active")
})

document.querySelector(".Currency").addEventListener("click",function(){  
  document.querySelector("#dashboard-view").classList.add("d-none")
  document.querySelector("#holidays-view").classList.add("d-none")
  document.querySelector("#events-view").classList.add("d-none")
  document.querySelector("#weather-view").classList.add("d-none")
  document.querySelector("#long-weekends-view").classList.add("d-none")
  document.querySelector("#sun-times-view").classList.add("d-none")
  document.querySelector("#my-plans-view").classList.add("d-none")
  document.querySelector("#currency-view").classList.remove("d-none")
  document.querySelector(".Dashboard").classList.remove("active")
  document.querySelector(".Holidays").classList.remove("active")
  document.querySelector(".Events").classList.remove("active")
  document.querySelector(".Weather").classList.remove("active")
  document.querySelector(".Long-Weekends").classList.remove("active")
  document.querySelector(".Currency").classList.add("active")
  document.querySelector(".Sun-Times").classList.remove("active")
    document.querySelector(".My-Plans").classList.remove("active")
})
document.querySelector(".Sun-Times").addEventListener("click",function(){  
  document.querySelector("#dashboard-view").classList.add("d-none")
  document.querySelector("#holidays-view").classList.add("d-none")
  document.querySelector("#events-view").classList.add("d-none")
  document.querySelector("#weather-view").classList.add("d-none")
  document.querySelector("#long-weekends-view").classList.add("d-none")
  document.querySelector("#currency-view").classList.add("d-none")
  document.querySelector("#my-plans-view").classList.add("d-none")
  document.querySelector("#sun-times-view").classList.remove("d-none")
  document.querySelector(".Dashboard").classList.remove("active")
  document.querySelector(".Holidays").classList.remove("active")
  document.querySelector(".Events").classList.remove("active")
  document.querySelector(".Weather").classList.remove("active")
  document.querySelector(".Long-Weekends").classList.remove("active")
  document.querySelector(".Currency").classList.remove("active")
  document.querySelector(".Sun-Times").classList.add("active")
    document.querySelector(".My-Plans").classList.remove("active")

})
document.querySelector(".My-Plans").addEventListener("click",function(){  
  document.querySelector("#dashboard-view").classList.add("d-none")
  document.querySelector("#holidays-view").classList.add("d-none")
  document.querySelector("#events-view").classList.add("d-none")
  document.querySelector("#weather-view").classList.add("d-none")
  document.querySelector("#long-weekends-view").classList.add("d-none")
  document.querySelector("#currency-view").classList.add("d-none")
  document.querySelector("#sun-times-view").classList.add("d-none")
  document.querySelector("#my-plans-view").classList.remove("d-none")
  document.querySelector(".Dashboard").classList.remove("active")
  document.querySelector(".Holidays").classList.remove("active")
  document.querySelector(".Events").classList.remove("active")
  document.querySelector(".Weather").classList.remove("active")
  document.querySelector(".Long-Weekends").classList.remove("active")
  document.querySelector(".Currency").classList.remove("active")
  document.querySelector(".Sun-Times").classList.remove("active")
  document.querySelector(".My-Plans").classList.add("active")
})

// //////////////////////////////////////////////////////////////////////////////////////////




