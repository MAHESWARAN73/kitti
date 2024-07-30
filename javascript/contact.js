// const from =document.querySelector("from");

// from.addEventListener("submit",(e)=>{
//     e.preventDefault;

//     if(!validateform(from)) return;

//     // valid submit form

//     alert("Message succefully send");

// });

// const validateform =(from)=>{
//     let valid = true;
//     //check emty fields
//     let name = from.querySelector(".name");
//     let message = from.querySelector(".message");
//     let email = from.querySelector(". email");

//     if (name.value === ""){
//         giveError(name, "please enter your name");
//         valid = false;

//     }

//     if (message.value === ""){
//         giveError(message, "please enter your name");
//         valid=false;

//     }
//     //email validate//
//     let emailRegex= kjhgfdfghjklhgf ;
//     let emailvalue = email.value;
//     if(!emailRegex.test(emailvalue)){
//         giveError(email,"please enter a valid email");
//         valid=false;
//     }

//     if (valid){
//         return true;
//     }

// };

// const giveError=(field,message)=>{
// let parentElement=field.parentElement;
//     parentElement.classList.add("error");
//     //if error msg alredy exist remove it

//     let existingError=parentElement.querySelector(".err-msg")
//     if(existingError){
//         existingError.remove();
//     }

// let error =document.createElement("span")
//     error.textContent=message;
//     error.classList.add("err-msg");
//     parentElement.appendchild(error);
// };

// //lets remove error on input

// const inputs=document.querySelectorAll("input")

// const textareas=document.querySelectorAll("textarea");

// let allFields=[...inputs,...textareas]
// allFields.forEach((field)=>{
//     field.addEventListener("input",()=>{
//         removeError(field);
//     });
// });

// const removeError=(field)=>{
//     let parentElement=field.parentElement;
//     parentElement.classList.remove("error");
//     let error=parentElement.querySelector(".err-msg")
//     if(error){
//         error.remove();
//     }
// };



const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    // valid submit form
    alert("Message successfully sent");
});

const validateForm = (form) => {
    let valid = true;

    // check empty fields
    let name = form.querySelector("input[name='name']");
    let message = form.querySelector("input[name='details']");
    let email = form.querySelector("input[name='email']");

    if (name.value.trim() === "") {
        giveError(name, "Please enter your name");
        valid = false;
    }

    if (message.value.trim() === "") {
        giveError(message, "Please enter your project details");
        valid = false;
    }

    // email validate
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValue = email.value.trim();
    if (!emailRegex.test(emailValue)) {
        giveError(email, "Please enter a valid email");
        valid = false;
    }

    return valid;
};

const giveError = (field, message) => {
    let parentElement = field.parentElement;
    parentElement.classList.add("error");

    // if error message already exists, remove it
    let existingError = parentElement.querySelector(".err-msg");
    if (existingError) {
        existingError.remove();
    }

    let error = document.createElement("span");
    error.textContent = message;
    error.classList.add("err-msg");
    parentElement.appendChild(error);
};

// remove error on input
const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");

let allFields = [...inputs, ...textareas];
allFields.forEach((field) => {
    field.addEventListener("input", () => {
        removeError(field);
    });
});

const removeError = (field) => {
    let parentElement = field.parentElement;
    parentElement.classList.remove("error");
    let error = parentElement.querySelector(".err-msg");
    if (error) {
        error.remove();
    }
};
