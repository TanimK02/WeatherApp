import './styles.css'

let tempType = "F";

async function getWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=VVDSQK2MW4GBBNU4X8N8SKREH`);
        const result = await response.json();
        console.log(result);
        return result
    }
    catch (error) {
        console.log(error)
    }

}

function tempConvertor(temp) {
    if (tempType == "C") {
        return `${((temp - 32) * 5 / 9).toFixed(0)}°C`
    }
    else {
        return `${((temp * 9 / 5) + 32).toFixed(0)}°F`
    }
}

function timeConvertor(time) {
    const [hour, minute, second] = time.split(":");
    let returnHour = hour > 12 ? hour - 12 : hour.slice(1, 2);
    if (returnHour == "0") {
        returnHour = 12;
    }
    const half = hour > 12 ? "PM" : "AM";
    return `${returnHour}:${minute} ${half}`;
}

function loadInCurrent(result) {
    const stats = result.currentConditions;
    const rainStat = stats.precipprob;
    const tempF = stats.temp;
    const iconName = stats.icon;
    document.getElementById("location").innerText = result.address;
    document.getElementById("rainChance").innerText = `Chance of rain: ${rainStat}%`;
    document.getElementById("currTemp").innerText = tempType == "F" ? `${tempF}°F` : tempConvertor(tempF);
    document.getElementById("location").innerText = `${result.address}`;
    import(`./assets/icons/${iconName}.svg`).then((pic) => {
        document.getElementById("currStatImg").src = pic.default;
    })
    loadInConditionCards(stats);
}

function loadInConditionCards(stats) {
    document.getElementById("uv").innerText = `${stats.uvindex}`;
    document.getElementById("humidity").innerText = `${stats.humidity}%`;
    document.getElementById('visibility').innerText = `${stats.visibility}m`;
    const feelLike = tempType == "F" ? `${stats.feelslike}°F` : tempConvertor(stats.feelslike);
    document.getElementById("feel").innerText = feelLike;
    document.getElementById("sunRise").innerText = timeConvertor(stats.sunrise);
    document.getElementById("sunSet").innerText = timeConvertor(stats.sunset);

}

function loadInTimeCards(hours, time, sparehours) {
    const weatherTimeContainer = document.getElementById("weatherTimeContainer");
    weatherTimeContainer.innerText = "";
    for (const hour of hours) {
        if (Number(hour.datetime.slice(0, 2)) >= time) {
            const div = document.createElement("div");
            div.className = "timeCard";
            const timeCardTime = document.createElement("p");
            timeCardTime.className = "timeCardTime";
            timeCardTime.innerText = timeConvertor(hour.datetime);
            const img = document.createElement("img");
            import(`./assets/icons/${hour.icon}.svg`).then(
                (pic) => { img.src = pic.default }
            );
            const timeCardTemp = document.createElement("p");
            timeCardTemp.className = "timeCardTemp";
            timeCardTemp.innerText = tempType == "F" ? `${hour.temp}°F` : tempConvertor(hour.temp);
            div.appendChild(timeCardTime);
            div.appendChild(img);
            div.appendChild(timeCardTemp);
            weatherTimeContainer.appendChild(div);
        }
    }
    for (const hour of sparehours) {
        const div = document.createElement("div");
        div.className = "timeCard";
        const timeCardTime = document.createElement("p");
        timeCardTime.className = "timeCardTime";
        timeCardTime.innerText = timeConvertor(hour.datetime);
        const img = document.createElement("img");
        import(`./assets/icons/${hour.icon}.svg`).then(
            (pic) => { img.src = pic.default }
        );
        const timeCardTemp = document.createElement("p");
        timeCardTemp.className = "timeCardTemp";
        timeCardTemp.innerText = tempType == "F" ? `${hour.temp}°F` : tempConvertor(hour.temp);
        div.appendChild(timeCardTime);
        div.appendChild(img);
        div.appendChild(timeCardTemp);
        weatherTimeContainer.appendChild(div);
        if (Number(hour.datetime.slice(0, 2)) == time) {
            break
        }
    }

}

function loadIn5Forecast(days) {
    const forecastList = document.getElementById("forecastList");
    forecastList.innerText = "";
    for (let i = 0; i < 5; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
        <p>Today</p>
                    <div class="liInternalDiv">
                        <img id=liImg${i} src="./assets/icons/hail.svg" />
                        <p>${days[i].conditions}</p>
                    </div>
                    <div class="hLTemp">
                        <p>${tempType == "F" ? `${days[i].tempmax.toFixed(0)}` : tempConvertor(days[i].tempmax).slice(0, 2)}</p>
                        <p>/${tempType == "F" ? `${days[i].tempmin.toFixed(0)}` : tempConvertor(days[i].tempmin).slice(0, 2)}</p>
                    </div>
                    `
        forecastList.appendChild(li);
        import(`./assets/icons/${days[i].icon}.svg`).then((pic) => {
            document.getElementById(`liImg${i}`).src = pic.default;
        })
    }
}

const input = document.getElementById("searchInput");
let data;
getWeather("New York City").then((result) => {
    data = result;
    loadInCurrent(data);
    loadInTimeCards(data.days[0].hours, Number(data.currentConditions.datetime.slice(0, 2)), data.days[1].hours);
    loadIn5Forecast(data.days);
}).catch((error) => {
    alert("Make sure location is spelt correctly. If location is spelt correctly try again.")
}).finally(() => {
    document.getElementById("loader").style.display = "none";
});
input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        document.getElementById("loader").style.display = "block";
        getWeather(input.value).then((result) => {
            data = result;
            loadInCurrent(data);
            loadInTimeCards(data.days[0].hours, Number(data.currentConditions.datetime.slice(0, 2)), data.days[1].hours);
            loadIn5Forecast(data.days);
        }).catch((error) => {
            alert("Make sure location is spelt correctly. If location is spelt correctly try again.")
        }).finally(() => {
            document.getElementById("loader").style.display = "none";
        });
    }
})

const f = document.getElementById("f");
const c = document.getElementById("c");

f.addEventListener("click", () => {
    f.style.backgroundColor = "darkgray";
    tempType = "F";
    loadInCurrent(data);
    loadInTimeCards(data.days[0].hours, Number(data.currentConditions.datetime.slice(0, 2)), data.days[1].hours);
    loadIn5Forecast(data.days);
    c.style.backgroundColor = "transparent";
})

c.addEventListener("click", () => {
    c.style.backgroundColor = "darkgray";
    tempType = "C";
    loadInCurrent(data);
    loadInTimeCards(data.days[0].hours, Number(data.currentConditions.datetime.slice(0, 2)), data.days[1].hours);
    loadIn5Forecast(data.days);
    f.style.backgroundColor = "transparent";
})