
//hela formuläret
const form = document.querySelector('#validationForm');

/*Tar in värdet från tidigare funktion*/
const error = (input) => {
    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
    console.log('You have to put in a valid input in ' + input.id);
    return false; //för att sätta false i arraylistan
}

const success = (input) => {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')
    return true; //för att sätta true i arraylistan
}

//Validera alla fälten så att alla fält måste ha ett innehåll och checkrutan måste klickas i

//id = det jag skriver i när jag kallar funktionen längre ner, här #firstName
const valText = (id) => {
    let input = document.querySelector(id)
    //input.value är det jag får ut. input är liksom hela raden (kod)
    if(input.value.trim().length < 2) {
        return error(input);
    }
    else {
        return success(input);
    }
}

const valEmail = (id) => {
    //fixa regex
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    let input = document.querySelector(id)
    if(input.value.trim().length < 2) {
        return error(input);
    } 
    else {
        return success(input);
    }
}

//lösenorden måste matcha varandra samt ha en längd på minst 6
const valPass = (id) => {
    let input = document.querySelector(id)
    if(input.value.trim().length < 6) {
        return error(input);
    }
    else {
        return success(input);
    }
}

//checkbox
const valCheckbox = (id) => {
    const input = document.querySelector(id)
    if(!input.checked) {
        return error(input)
    }
    else {
        return success(input)
    }
}

let setPassword = null;

const compPass = (pass1, pass2) => {
    if ((pass1 === pass2) && valPass('#password') == true) {
        setPassword = document.querySelector('#password').value;
        return true;
    } 
    else {
        return false;
    }
}

//Tom array som loggar true/false
const errors = []

//User - tom array som fylls på när det händer nåt
const user = {}

//när man klickar på submit
form.addEventListener('submit', e => {
//Förhindra sidan att laddas om när formuläret ska valideras.
     e.preventDefault();
/*Det bara här jag kallar på funktionen och ger den ett värde
Hela kedjan bygger typ på att du får ut ett true/false*/

     errors[0] = valText('#firstName')
     errors[1] = valText('#lastName')
     errors[2] = valEmail('#email')
     errors[3] = valPass('#password')
     errors[4] = valPass('#repeatPassword')
     errors[5] = compPass(document.querySelector('#password').value, document.querySelector('#repeatPassword').value)
     errors[6] = valCheckbox('#terms')


     if(errors.includes(false)) {
        console.log('Någonting gick fel')
        errorMessage.classList.remove('d-none')
        
     }
     else {
        //lägger in all info i objectet.
        user.firstName = document.querySelector('#firstName').value
        user.lastName = document.querySelector('#lastName').value
        user.email = document.querySelector('#email').value
        user.password = setPassword
        
        //addar tillbaka d-noneklassen så att felmeddelandet försvinner
        errorMessage.classList.add('d-none')

        console.log('Bra jobbat, du lyckades skapa e profil!')
        console.log(user);
     }
     
})

