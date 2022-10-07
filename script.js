/*




Om valideringen går igenom så ska du istället logga ut ett success
 meddelande i consolen och skapa ett user objekt som har följande fält: 
 firstName, lastName, email, password. Detta objekt ska också skrivas ut i consolen


 Alla fälten ska valideras så att korrekt information skriv in. ( email måste vara en emailadress, 
 och ett namn ska inte få vara kortare än 
2 bokstäver samt inte innehålla några siffror)
 */



//hela formuläret
const form = document.querySelector('#validationForm');

/*Om något av fälten inte är ifyllda eller checkrutan inte är iklickad så ska du logga ett f
elmeddelande i consolen där du skriver att någonting har gått fel.*/
const error = (input) => {
    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
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
    const checkbox = document.querySelector(id)
    if(!checkbox.checked) {
        return error(checkbox)
    }
    else {
        return success(checkbox)
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

//array som loggar true/false
const errors = []

//users
const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

//när man klickar på submit
form.addEventListener('submit', e => {
    //Förhindra sidan att laddas om när formuläret ska valideras.
     e.preventDefault();
/*Hittills är det bara här jag kallar på funktionen och ger den ett värde*/

     errors[0] = valText('#firstName')
     errors[1] = valText('#lastName')
     errors[2] = valEmail('#email')
     errors[3] = valPass('#password')
     errors[4] = valPass('#repeatPassword')
     errors[6] = compPass(document.querySelector('#password').value, document.querySelector('#repeatPassword').value)
     errors[5] = valCheckbox('#terms')

     if(errors.includes(false)) {
        console.log('Någonting gick fel')
     }
     else {
        user.firstName = document.querySelector('#firstName').value
        user.lastName = document.querySelector('#lastName').value
        user.email = document.querySelector('#email').value
        user.password = setPassword

        console.log('Bra jobbat, du lyckades skapa e profil!')
        console.log(user);
     }
     
})

