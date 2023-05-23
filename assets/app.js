//search variables
const exerciseInput = document.querySelector(".exerciseInput");
const recipeInput = document.querySelector(".recipeInput")
const exBtn = document.querySelector(".exSearch")
const recipeBtn = document.querySelector(".recipeSearch")
// const apiUrl = 'https://exerciseapi3.p.rapidapi.com/search/?primaryMuscle=${params}'

//exercise api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f949d10bd8mshf91fea6233b3069p123fb3jsn202554e50322',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

//recipe api
const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f949d10bd8mshf91fea6233b3069p123fb3jsn202554e50322',
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
	}
	

};
// //call exercise
async function checkEx(body) {
	const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${body}`, options);
	const data = await response.json();

	//loop object to find randomg
	function randData(data){
		
		
		const keys = Object.keys(data);
		const values = Object.values(data);
		randKeys = keys[Math.floor(Math.random()*keys.length)];
		randValues = values[Math.floor(Math.random()*values.length)];
		return	randValues 
		
	}

	const domNameValue = randData(data); // dont want to call function everytime

	//ex1
	document.querySelector(".exName").textContent = domNameValue.name;
	document.querySelector(".exTarget").textContent = domNameValue.target
	document.querySelector(".exEquipment").textContent = domNameValue.equipment;
	document.querySelector(".exUrl").textContent = domNameValue.gifUrl;	
	//NOTE: Dont uncomment these, free subcription only lets you call so many times before hitting daily limit!!!!!!!!!!!!!!!!!
	
}

//calling checkEx function
exBtn.addEventListener('click', ()=> {
	checkEx(exerciseInput.value);
})

//fetch recipe api
async function checkRecipe(params) {
	const response1 = await fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${params}`, options1); 
	const recipeData = await response1.json();
	// console.log(recipeData);
	const arrRecipe = recipeData.hits;
	// console.log(arrRecipe);

	//loop object to find random
	function randRecipe(arrRecipe){
		const keys1 = Object.keys(arrRecipe);
		const values1 = Object.values(arrRecipe);
		randKeys1 = keys1[Math.floor(Math.random()*keys1.length)]; //redundant
		randValues1 = values1[Math.floor(Math.random()*values1.length)];
		return	randValues1
		} 
	const domRecipeValues = randRecipe(arrRecipe); // dont want to call function everytime
	console.log(domRecipeValues);

	// recipe
	document.querySelector(".recipeName").innerHTML = domRecipeValues.recipe.label;
	document.querySelector(".cuisineType").innerHTML = domRecipeValues.recipe.cuisineType;
	document.querySelector(".calories").innerHTML = domRecipeValues.recipe.calories;
	document.querySelector(".recipeUrl").innerHTML = domRecipeValues.recipe.url;
}



recipeBtn.addEventListener('click', ()=> {
	checkRecipe(recipeInput.value);

})




//---------------------------------- Code from Francis Starts Here--------------------------------------------------
//Get userinputs
const ageSpinner = document.querySelector('#ageSpinner')
const genderVal = document.querySelector('#gender')
const weightSpinner = document.querySelector('#weightSpinner')
const heightSpinner = document.querySelector('#heightSpinner')
const goBtn = document.querySelector('.goBtn')

//get display labels
const bmiContainer = document.querySelector('.bmiData')
const statusContainer = document.querySelector('.statusData')
//fetch data
async function fetchHealthData(age,gender,height,weight){
  // const gender ="male"
	// const age =47; //replace with input field from the web app
	// const height=174; //replace with input field from the web app
  // const weight =81;
  // Get user inputs
	const apiKey ='45a321c547mshbf41430848e0da1p17077ejsn7669b6d7e3c4'
	const url = `https://health-calculator-api.p.rapidapi.com/bodyfat?gender=${gender}&age=${age}&height=${height}&weight=${weight}&unit=metric`;
  

	const options = {
                    method: 'GET',
                    headers: {
                      'X-RapidAPI-Key': apiKey,
                      'X-RapidAPI-Host': 'health-calculator-api.p.rapidapi.com'
		                        }
	                };
	  try {
          const response = await fetch(url, options);
          const result = await response.json();

          
        
          // Display results
          displayHealthData(result, age, gender, height, weight)
	     } 
    catch (error) {
		            console.error(error);
	     }
	}
  //store fetched data into local storage
  function storeHealthDataLocally(healthData, age, gender, height,weight){
    //create an object to be stored
    const storedData={
      healthData:healthData,
      age:age,
      gender:gender,
      height:height,
      weight:weight
    };
    localStorage.setItem('storedData', JSON.stringify(storedData)); //convert it to a string before storage
  }
  
  function displayHealthData(result) {

    //pass user inputs into local storage
    const age = ageSpinner.value;
    const gender = genderVal.value;
    const height =heightSpinner.value;
    const weight =weightSpinner.value;
   
   //store the data and user inputs into local storage
    storeHealthDataLocally(result, age, gender, height, weight);

    //update display labesl with extracted a
    console.log(result) //test if data is coming back
    const bmi = result.bmi
    const status  = result.bodyfat_status
      // Update the display labels with the extracted values
      bmiContainer.textContent = `${bmi}`;
      statusContainer.textContent = `${status}`;
  }
  // Code for the GO button
  goBtn.addEventListener('click',() => {
    const age = ageSpinner.value;
    const gender = genderVal.value;
    const height = heightSpinner.value;
    const weight = weightSpinner.value;
    console.log(`age:${ageSpinner.value}|gender:${genderVal.value} |height:${heightSpinner.value}|weight:${weightSpinner.value}`)//testing getting user input
    fetchHealthData(age,gender,height,weight);
  })

//retrive data from storage and display it when the page loads
function loadHealthDataFromLocalStorage(){
  const storedData = localStorage.getItem('storedData'); 
  if(storedData){
    const parseData =JSON.parse(storedData)// covert stored data from a string to a javascript object
    const {healthData, age, gender, height, weight} = parseData //assign retrieved data to its variables

    //update the form field values
    ageSpinner.value = age;
    genderVal.value = gender;
    heightSpinner.value = height;
    weightSpinner.value =weight;
    
    //display loaded health data
    displayHealthData(healthData, age, gender, height, weight)
  }
}
//call the load function when the page loads
window.addEventListener('load', loadHealthDataFromLocalStorage)
//-------------------------------------- Changes from Francis End Here-----------------------------------------



