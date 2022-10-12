
//hela formuläret
const form = document.querySelector('#validationForm');

//Error för text, email
const error = (input) => {
//För att få ut det som står i labeln i ren text i consolen.
    const label = document.querySelector(`#${input.id}-label`)
    //får ut label innertext
    let string = label.textContent;
    //ta bort komma på slutet
    let string2 = string.slice(0, -1);

    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
    console.log('You have to put in a valid input in ' + string2.toLowerCase() + ".");
    return false; //för att sätta false i arraylistan
}

//success för text, email
const success = (input) => {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')
    return true; //för att sätta true i arraylistan
}

//error för password, sätter röd border för båda password om ett eller båda av de failar
const passError = (pass1, pass2) => {   
    pass1.classList.remove('is-valid')
    pass2.classList.remove('is-valid')
    pass1.classList.add('is-invalid')
    pass2.classList.add('is-invalid')
    return false;
}
//success för password, sätter grön border för båda password om ett elelr båda av de failar
const passSuccess = (pass1, pass2) => {
    
    pass1.classList.remove('is-invalid')
    pass2.classList.remove('is-invalid')
    pass1.classList.add('is-valid')
    pass2.classList.add('is-valid')
    return true;
}
//error for checkbox
const errorCheck = () => {
    console.log('You have to check the checkbox.');
    return false;
}

//validate namn
const valText = (id) => {
    let input = document.querySelector(id)
    //RegEx som bara tillåter bokstäver,space och - , om man tex har dubbelnamn
    let regEx = /^[a-zA-Z\s\-]*$/;

    if(input.value.trim().length < 2) {
        return error(input);
    }
    else if(!regEx.test(input.value)) {
        return error(input);
    }
    else {
        return success(input);
    }
}

//validate email
const valEmail = (id) => {
    //fixa regex
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    let input = document.querySelector(id)
    if(input.value.trim().length < 2) {
        return error(input);
    } else if (!regEx.test(input.value)) {
        return error(input);
    }

    else {
        return success(input);
    }
}

//validate checkbox
const valCheckbox = (id) => {
    const input = document.querySelector(id)
    if(!input.checked) {
        return errorCheck()
    }
    else {
        return true;
    }
}

//tom passwordvariabel för att kunna sätta senare.
let setPassword = null;

//validate passwords
const valPass = (id1, id2) => {
    let pass1 = document.querySelector(id1);
    let pass2 = document.querySelector(id2);
    //förhindrar space i lösenord
    let regEx = /^\S+$/

    if (pass1.value !== pass2.value) {    
       console.log('Your passwords doesn\'t match.')
        return passError(pass1, pass2);
    } 
    //inte tomt
    else if(pass1.value.trim().length < 1) {
        console.log('Your password can\'t be left blank.')
        return passError(pass1, pass2);
    }
    //för kort
    else if(pass1.value.trim().length < 6) {
        console.log('Your password is to short.')
        return passError(pass1, pass2);
    }
    //space
    else if(!regEx.test(pass1.value)) {
        console.log('Your password is not allowed to use space.')
        return passError(pass1, pass2);
    }
    else {
        //Om alla tidigare krav uppfylls så sätts passwordet
        setPassword = pass1.value;
        return passSuccess(pass1, pass2);
    }
}

//Tom array som loggar true/false
const errors = []

//User - tom array som fylls på när användaren skapas
const user = {}

//när man klickar på submit
form.addEventListener('submit', e => {
//Förhindra sidan att laddas om när formuläret ska valideras.
     e.preventDefault();
    
     //skickar de olika id:na till funktioner för att hämta hem true/false till errors array
     errors[0] = valText('#firstName')
     errors[1] = valText('#lastName')
     errors[2] = valEmail('#email')
     errors[3] = valPass('#password', '#repeatPassword')
     errors[4] = valCheckbox('#terms')

    //om errors error innehåller något false
     if(errors.includes(false)) {
        console.log('Something went wrong.')
        errorMessage.classList.remove('d-none')      
     }
     //om errors bara innehåller true, skapar object
     else {
        let fName = document.querySelector('#firstName').value
        let lName = document.querySelector('#lastName').value
        let email = document.querySelector('#email').value
        //lägger in all info i objectet i små bokstäver så att det ska bli enklare att söka bland objekt i framtiden. Utom password som får innehålla olika
        user.firstName = fName.toLowerCase()
        user.lastName = lName.toLowerCase()
        user.email = email.toLowerCase()
        user.password = setPassword
        
        //addar tillbaka d-noneklassen så att felmeddelandet försvinner
        errorMessage.classList.add('d-none')

        console.log('Well done! You managed to register a profile!')
        console.log(user);
     }
     
})


