let inputs = document.querySelectorAll('input'); //Nadjemo sve inpute

// Napravimo skup za sve moguce greske
let errors = {
    "ime_prezime": [],
    "korisnicko_ime":[],
    "email": [],
    "lozinka": [],
    "ponovi_lozinku": []
};

// Prodjemo kroz petlju za sva input polja i dodamo mu event listener na promenu

inputs.forEach(element => {
   element.addEventListener('change', e => {
       
      let currentInput = e.target; //Koje je polje koje se promenilo
      
      let inputValue = currentInput.value; //Tekst koji je upisan u polju
      
      let inputName = currentInput.getAttribute('name'); // Ime polja u kome se izvrsila promena
      
        if (inputValue.length > 4) {
            errors[inputName] = [];
            
            switch (inputName) {
                case 'ime_prezime':
                    
                    let validation = inputValue.trim(); //Sece razmak levo i desno ne dozvoljava da prevarimo sistem
                    validation = validation.split(" "); //Delimo tekst na 2 dela
                    if(validation.length < 2){ //Ako nema 2 teksta izbacuje gresku
                        errors[inputName].push('Moras napisati ime i prezime');
                    }
                    break;
                    
                case 'email':
                    if(!validateEmail(inputValue)){ //Validate email napravljena funckija za proveru email-a preko regex-a
                       errors[inputName].push('Neispravna email adresa');
                    } 
                    break;
                    
                case 'ponovi_lozinku':
                    let lozinka = document.querySelector('input[name="lozinka"]').value;
                    if(inputValue !== lozinka) {
                        errors[inputName].push('Lozinke se ne poklapaju');
                    }
            }
        } else {
            errors[inputName] = ['Polje ne moze imati manje od 5 karaktera'];
        }
               populateErrors();
   });
});

//Ovde smo kreirali ul listu i u njoj li item-e kako bi izbacivali gresku
const populateErrors = () => {
    
    for(let elem of document.querySelectorAll('ul')){
        elem.remove();
    }
    
    for (let key of Object.keys(errors)){
        
        let input = document.querySelector(`input[name=${key}`);
        
        let parentElement = input.parentElement;
        
        let errorsElement = document.createElement('ul');
        
        parentElement.appendChild(errorsElement);
        
        
        errors[key].forEach(error => {
            
           let li = document.createElement('li');
           li.innerText = error;
           
           errorsElement.appendChild(li);
        });
    }
    
};

const validateEmail = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    } 
    return false;
};