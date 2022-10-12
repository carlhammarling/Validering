
//hela formuläret
const form = document.querySelector('#validationForm');

/*Tar in värdet från tidigare funktion*/
const error = (input) => {
//För att få ut det som står i labeln i ren text i consolen.
    const label = document.querySelector(`#${input.id}-label`)
    let string = label.textContent;
    let string2 = string.slice(0, -1);

    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
    console.log('You have to put in a valid input in ' + string2.toLowerCase() + ".");
    return false; //för att sätta false i arraylistan
}
const passError = (pass1, pass2) => {
//För att få ut det som står i labeln i ren text i consolen.
    
    pass1.classList.remove('is-valid')
    pass2.classList.remove('is-valid')
    pass1.classList.add('is-invalid')
    pass2.classList.add('is-invalid')
    return false;
}
const passSuccess = (pass1, pass2) => {
//För att få ut det som står i labeln i ren text i consolen.
    
    pass1.classList.remove('is-invalid')
    pass2.classList.remove('is-invalid')
    pass1.classList.add('is-valid')
    pass2.classList.add('is-valid')
    return true;
}
const errorCheck = (input) => {
    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
    console.log('You have to check the checkbox.');
    return false; //för att sätta false i arraylistan
}

const success = (input) => {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')
    return true; //för att sätta true i arraylistan
}


//id = det jag skriver i när jag kallar funktionen längre ner, här #firstName
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

//checkbox
const valCheckbox = (id) => {
    const input = document.querySelector(id)
    if(!input.checked) {
        return errorCheck(input)
    }
    else {
        return success(input)
    }
}

let setPassword = null;

const compPass = (id1, id2) => {
    let pass1 = document.querySelector(id1);
    let pass2 = document.querySelector(id2);
    //förhindrar space i lösenord
    let regEx = /^\S+$/

    if (pass1.value !== pass2.value) {    
       console.log('Your passwords doesn\'t match.')
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
        //Om båda matchar sätter den password
        setPassword = pass1.value;
        return passSuccess(pass1, pass2);
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
     errors[3] = compPass('#password', '#repeatPassword')
     errors[4] = valCheckbox('#terms')


     if(errors.includes(false)) {
        console.log('Something went wrong')
        console.log(errors)
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

        console.log('Well done! You managed to register a profile!')
        console.log(user);
     }
     
})


