let currentStep = 0;
const formSteps = document.querySelectorAll('.form-step');
const form = document.querySelector('form');

/* steps */
form.addEventListener('click', (e) =>{
    if(!e.target.matches('[data-action]')){
        return
    }

    const actions = {
        next() {
            if (!isValidInputs()){
                return
            }
            currentStep++
        },
        prev() {
            currentStep--
        }
    }

    const action = e.target.dataset.action
    actions[action]();

    updateActiveStep()
    updateProgressStep()
})

/* Envio do formulário */
form.addEventListener('submit', (e) => {
    e.preventDefault()


    const data = new FormData(form)

    for(let [key, value] of data){
        console.log(key, value)
    }
    alert(`Obrigado ${data.get('name')}!`)
})

/* Update steps */

function updateActiveStep() {
    formSteps.forEach(step => step.classList.remove('active'))
    formSteps[currentStep].classList.add('active')
}

const progressStep = document.querySelectorAll(".step-progress [data-step]")
function updateProgressStep() {
    progressStep.forEach((step, idx) => {
        step.classList.remove('current')
        step.classList.remove('completed')

        if(idx < currentStep + 1){
            step.classList.add('current')
        }

        if(idx < currentStep){
            step.classList.add('completed')
        }
    })
}

/* Máscaras ER */
function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('phone').onkeyup = function(){
		mascara( this, mtel );
	}
}

/* validation */
function isValidInputs(){
    const currentFormStep = formSteps[currentStep]
    const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]
    const nameRegex = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let isValid = true

    formFields.forEach((input) => {
        if(input.name == "name"){
            if(!nameRegex.test(input.value)){
               isValid = false
               input.parentElement.classList.add("error")
            }
       }

        if(input.id == "phone"){
            let number = input.value;
            number = number.toString();
            if (number.length < 15){
                isValid = false
                input.parentElement.classList.add("error")
            }
        }

        if(input.type == "email"){
            let aux = emailRegex.test(input.value)
            if(!aux){
                isValid = false
                input.parentElement.classList.add("error")
            }
        }

        if(input.type == "number" && input.value <= 0){
            isValid = false
            input.parentElement.classList.add("error")
        }
        
        input.addEventListener("input", () => {
            if(input.value != null && input.value != ""){
                input.parentElement.classList.remove("error")
            }
        })
        
    })

    return isValid
}


/* animation */

formSteps.forEach(formStep => {
    function addHide(){
        formStep.classList.add('hide')
    }

    formStep.addEventListener('animationend', e => {
        addHide()
        formSteps[currentStep].classList.remove('hide')
    })
})