let signupForm = document.getElementsByClassName("signupForm")[0]
let OTPPage = document.getElementsByClassName("otpsection")[0]
const wrapper = document.querySelector(".wrapper")
const signupHeader = document.querySelector(".signup header")
const loginHeader = document.querySelector(".login header")

// PASSWORD VISIBILITY
function showPassword(element){
    var x = document.getElementById(element);
    x.type = x.type === "password" ? "text" : "password";
}
// END PASSWORD VISIBILITY

loginHeader.addEventListener("click",()=>{ wrapper.classList.add("active")})
signupHeader.addEventListener("click",()=>{ 
    OTPPage.style.display = "none";
    signupForm.style.display = "flex"
    wrapper.classList.remove("active");
})
function movetologin(){
    signupForm.style.display = "flex"
    OTPPage.style.display = "none"
}

// OTP SECTION
const inputs = document.querySelectorAll("input")
const button = document.querySelector("button")

// iterate over all inputs
const inputArray = []
for(let i=5;i<9;i++){
    let inp = document.getElementsByTagName('input')[i]
    inputArray.push(inp)
}
inputArray.forEach((input, index1) =>{
input.addEventListener("keyup", (e) =>{
    const currentInput = input
    const nextInput = input.nextElementSibling
    const prevInput = input.previousElementSibling

    if(currentInput.value.length > 1){
        currentInput.value = ""
        return;
    }
    if(nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== ""){
        nextInput.removeAttribute("disabled")
        nextInput.focus()
    }

    // if backspace key is press
    if(e.key === "Backspace"){
        // iterate over all inputs again
        inputArray.forEach((input , index2) =>{
            if(index1 <= index2 && prevInput){
                input.setAttribute("disabled",true)
                input.value = ""
                prevInput.focus()
            }
        })
    }

    if(document.getElementById("lastOTPNum").disabled===false && document.getElementById("lastOTPNum").value !== ""){
        document.getElementById("otpBtn").classList.add("activeOTPBtn")
    }
    document.getElementById("otpBtn").classList.remove("activeOTPBtn")
})
})

// focus the first input which index is 0 on window load
window.addEventListener("load", ()=> inputs[0].focus())
//END OTP SECTION

// Add event listener to the form submission event
document.getElementById('signupForm').addEventListener('submit', signUpForm);
// post signup form
async function signUpForm(event) {
    event.preventDefault(); 
    const signupData = {
        signupFullName: document.getElementById("signupFullName").value,
        signupEmail: document.getElementById("signupEmail").value,
        signupPassword: document.getElementById("signupPassword").value
    };

    fetch('http://localhost:4000/api/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("successMessage").innerHTML = data.message;
        document.getElementById("modal").style.display = "block";
        if(data.otpSend){
            signupForm.style.display = "none"
            OTPPage.style.display = "flex" 
        }
        setTimeout(() => {
            document.getElementById("modal").style.display = "none";
        }, 1500);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// otp verification
// async function otpVerification(){
//     let otpNumber = "";
//     for (let i = 1; i < 5; i++) {
//       otpNumber += document.querySelector("otp"+i);
//     }
//     console.log(otpNumber);
//     let formData = new FormData
//     formData.append('otpNumber', otpNumber);

//     try {
//         await fetch(`http://localhost:4000/api/users/${otpNumber}`,{
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: formData
//         })
//         .t
//         let response = result.json();
//     } catch (error) {
//         console.error(error);
//     }
// }

