const button = document.getElementById("myButton")
const userInput = document.getElementById("floatingInput")
const myHeading = document.getElementById('h1');
let answer = document.getElementById("answer")
let answerText = answer.innerText
const apiKey = "ae078b87fea1e8b81879ba63174ed019"
const myDiv = document.getElementById("myDiv")

button.addEventListener('click', function(event) {
    event.preventDefault()
    answer.innerHTML = '<div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div>';
        setTimeout(function() {
        event.preventDefault();
        doAction();
    }, 1300);
});
async function doAction(){
    var inputValue = userInput.value
    function capitalizeWord(inputValue) {
        const firstLetter = inputValue.charAt(0).toUpperCase();
        const restOfWord = inputValue.slice(1).toLowerCase();
        return firstLetter + restOfWord;
      }

        inputValue = capitalizeWord(inputValue)
        try{
        const response =await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=ae078b87fea1e8b81879ba63174ed019` )
        const data =await response.json();
        const weather = await (Number(data["main"]["temp"]) - 273.15).toFixed(2)
        const description = await data.weather[0].description;
        console.log(description);
        answer.textContent = `The weather in ${inputValue} is ${weather}C.  \nIt looks like ${description}.`;
        if (description == "clear sky"){
            myDiv.style.backgroundImage = "url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/green-field-over-blue-clear-sky-da-kuk.jpg')";
            myDiv.style.backgroundSize = "cover";
            myHeading.classList.add('white-text');
        }
        else if (description == "few clouds" || description === "broken clouds"){
            myDiv.style.backgroundImage = "url('https://images.pexels.com/photos/10883166/pexels-photo-10883166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
            myDiv.style.backgroundSize = "cover";
            myHeading.classList.remove('white-text');
        }
        else if (description == "scattered clouds"){
            myDiv.style.backgroundImage = "url('https://c0.wallpaperflare.com/preview/532/447/657/scattered-white-clouds.jpg')";
            myDiv.style.backgroundSize = "cover";
            myHeading.classList.add('white-text');
        }
        else if (description === "shower rain" || description === "rain" || description === "light intensity shower rain" || description === "heavy intensity rain"){
            myDiv.style.backgroundImage = "url('https://i.pinimg.com/originals/80/dc/f8/80dcf8adac05951e22f76f1505ea5fb5.gif')";
            myDiv.style.backgroundSize = "contain";
            myDiv.style.left = '300px'
            myHeading.classList.remove('white-text');            
        }
        else if (description == "thunderstorm"){
            myDiv.style.backgroundImage = "url('image.png')";
            myDiv.style.backgroundSize = "cover";
            myHeading.classList.add('white-text');
        }
       else if (description == "snow" || description === "mist"){
            myDiv.style.backgroundImage = "url('https://i.pinimg.com/564x/87/6c/c3/876cc320d39342429946c584f61acb2b.jpg')";
            myDiv.style.backgroundSize = "cover";
            myHeading.classList.remove('white-text');
        }
        else{
            myDiv.style.backgroundImage = "url('https://i.ytimg.com/vi/rFngquRtn5o/maxresdefault.jpg')";
            myDiv.style.backgroundSize = "cover";
            myHeading.classList.remove('white-text');
        }
    }catch (error) {
        console.error("An error occurred:", error.message);
        answer.innerHTML = "Error occurred while fetching weather data - please try again.";}
        
}

