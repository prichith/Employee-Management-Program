
// GET EMPLOYEE ID
let url = new URLSearchParams(document.location.search);
let employeeId = url.get("id") // globally assign employee id
// END GET EMPLOYEE ID

// EMPLOYEE DETAILS
let employeeDetDP = document.getElementById("employeeDetailsDp")
let employeeDetFullName = document.getElementById("employeeDetFullName")
let employeeDetEmail = document.getElementById("employeeDetEmail")
let employeeDetGender = document.getElementById("employeeDetGender")
let employeeDetAge = document.getElementById("employeeDetAge")
let employeeDetDob = document.getElementById("employeeDetDob")
let employeeDetPhone = document.getElementById("employeeDetPhone")
let employeeDetQualification = document.getElementById("employeeDetQualification")
let employeeDetAddress = document.getElementById("employeeDetAddress")
let employeeDetUsername = document.getElementById("employeeDetUsername")
let overlayEl = document.getElementById("overlay")

// FILLING EMPLOYEE DETAILS FORM
    fetch("http://localhost:4000/employee/"+ new URLSearchParams({id : `${employeeId}`}))
    .then((employee)=>{
        return employee.json();
    }).then((user)=>{ 
            employeeDetFullName.innerHTML = user.salutation+" "+user.firstname+" "+user.lastname
            employeeDetEmail.innerHTML = user.email
            employeeDetGender.innerHTML = user.gender
            employeeDetAge.innerHTML = calculateAge((user.dob))
            employeeDetDob.innerHTML = removeTimeFromDOB(user.dob).split('-').reverse().join('-')
            employeeDetPhone.innerHTML = user.phone
            employeeDetQualification.innerHTML = user.qualifications
            employeeDetAddress.innerHTML = user.address
            employeeDetUsername.innerHTML = user.username
            employeeDetDP.src = `../img/public/avatars/${user.avatar}`
        })

        function removeTimeFromDOB(birthdate){
            let array = []
            let date = birthdate.split('T')
            array.push(date[0])
            return array[0]
          }
// END FILLING EMPLOYEE DETAILS FORM

// CALCULATING AGE
    function calculateAge (birthDate) {
        let Dob = birthDate.split('T')[0].split('-')
        let birthdate =[]
        for(let i=0;i<3;i++){
            birthdate.push(parseInt(Dob[i]))
        }
        let otherDate = new Date();
        var yearDifference = otherDate.getFullYear() - birthdate[0];
        if (otherDate.getMonth() < birthdate[1] || otherDate.getMonth() == birthdate[1] && otherDate.getDate() < birthdate[2])
         yearDifference-- 
        if(yearDifference== -1){
            return 0
        }else{
        return yearDifference;            
        }
    }
// END CALCULATING AGE

// DELETE FORM
let EdDeleteForm = document.getElementById("employeeDetDeleteForm")
// DELETE FORM BUTTON FUNCTIONS
    function employeeDetDelete(){
        EdDeleteForm.style.display = "block"
        overlayEl.style.display = "block"
    }
    function edDelClose(){
        EdDeleteForm.style.display = "none"
        overlayEl.style.display = "none"
    }
    function edDelCancel(){
        EdDeleteForm.style.display = "none"
        overlayEl.style.display = "none"
    }
// END DELETE FORM BUTTON FUNCTIONS

// DELETE METHOD
    function edDelete(){
        fetch("http://localhost:4000/employee/"+new URLSearchParams({id : `${employeeId}`}), {
            method: "DELETE"})
            .then((response) => {
                EdDeleteForm.style.display = "none"
                overlayEl.style.display= "none"
                if (!response.ok) {
                return response.json().then((errorResponse) => {
                    modalMsg.innerText = "Employee deletion failed !"
                    modalEl.style.backgroundColor = "#d93b3b"
                    modalEl.style.display = "block"
                    setTimeout(hide,3000)
                    console.error("Server validation errors:", errorResponse.errors);
                });
                }
                return response.json();
                })
            .then((responseData) => {
            modalMsg.innerText = responseData.message
            modalEl.style.backgroundColor = "#3ea31a"
            modalEl.style.display = "block"
            setTimeout(hide,1500)
            setTimeout(() => { window.location.href="/employees" }, 1550);
            
            console.log("Server response:", responseData);
            })
            .catch((error) => {
            console.error("Error in POST request:", error);
            });
    }
// END DELETE METHOD

// END DELETE FORM

// EDIT EMPLOYEE FORM
let maleEl = document.getElementById("editMale")
let femaleEl = document.getElementById("editFemale")
let edEditEmployeeForm = document.getElementById("ed-editEmployeeForm")
let changeDp = document.getElementById("EdChangeDp")
let profPic // globally assign avatar
let EdEditEmployeeDp = document.getElementById("EdEditEmployeeDp")

// BUTTON FUNCTIONS
    function employeeDetEdit(){
        overlayEl.style.display = "block"
        edEditEmployeeForm.style.display = "block"
        filledEditForm()
    }
    function EdFormClose(){
        edEditEmployeeForm.style.display = "none"
        overlayEl.style.display = "none"
    }
    function EdFormCancel(){
        edEditEmployeeForm.style.display = "none"
        overlayEl.style.display = "none"
    }
    changeDp.addEventListener('change' , () => {
        profPic = changeDp.files[0];
    })
// END BUTTON FUNCTIONS

// FILL EDIT EMPLOYEE FORM
    function filledEditForm(){
        fetch("http://localhost:4000/employee/"+ new URLSearchParams({id : `${employeeId}`})).then((employee)=>{
            return employee.json();
        }).then((user)=>{ 
            console.log(user);
            document.getElementById("editSalutation").value = user.salutation
            document.getElementById("editFirstName").value = user.firstname
            document.getElementById("editLastName").value = user.lastname
            document.getElementById("editUsername").value = user.username
            document.getElementById("editpassword").value = user.password
            document.getElementById("editEmail").value = user.email
            document.getElementById("editPhone").value = user.phone
            document.getElementById("editDob").value = removeTimeFromDOB(user.dob) //yy-mm-dd format
            user.gender === 'Male' ? maleEl.checked = true : femaleEl.checked = true;
            document.getElementById("editQualifications").value = user.qualifications
            document.getElementById("editAddress").value = user.address
            document.getElementById("editCountry").value = user.country
            document.getElementById("editState").value = user.state
            document.getElementById("editCity").value = user.city
            document.getElementById("EdEditEmployeeDp").src = `../img/public/avatars/${user.avatar}`
    })}
    // fn to remove time from dob
    function removeTimeFromDOB(birthdate){
        let array = []
        let date = birthdate.split('T')
        array.push(date[0])
        return array[0]
      } 
    //END fn to remove time from dob
// END FILL EDIT EMPLOYEE FORM

// DATE OF BIRTH REVERSING
    function dob(day){
        let date = day.split('-').reverse().join('-')
        return date
    }
// END DATE OF BIRTH REVERSING

// PUT METHOD IN EDIT EMPLOYEE FORM
    function editEmployeePutMethod(){
        fetch(`http://localhost:4000/employee/${employeeId}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(editedData()),
            })
            .then((response) => {
                edEditEmployeeForm.style.display = "none";
                overlayEl.style.display= "none"
                if (!response.ok) {
                return response.json().then((errorResponse) => {
                    modalMsg.innerText = "Employee updation failed !"
                    modalEl.style.backgroundColor = "#d93b3b"
                    modalEl.style.display = "block"
                    setTimeout(hide,3000)
                    console.error("Server validation errors:", errorResponse.errors);
                })}else{
                    if(profPic) uploadAvatar(employeeId,profPic)  // update avatar
                }
                return response.json();
                })
                .then((responseData) => {                    
                    modalMsg.innerText = responseData.message
                    modalEl.style.backgroundColor = "#3ea31a"
                    modalEl.style.display = "block"
                    setTimeout(hide,1500)
                    setTimeout(()=>{location.reload()},1550)
                })
    }
// END PUT METHOD IN EDIT EMPLOYEE FORM

// EDITED OBJECT FOR PUT OPERATION
    function editedData(){
        let user = {
            salutation : document.getElementById("editSalutation").value,
            firstname : document.getElementById("editFirstName").value,
            lastname : document.getElementById("editLastName").value,
            email : document.getElementById("editEmail").value,
            phone : document.getElementById("editPhone").value,
            dob : document.getElementById("editDob").value,
            gender : gender(),
            qualifications : document.getElementById("editQualifications").value,
            address : document.getElementById("editAddress").value,
            city : document.getElementById("editCity").value,
            state : document.getElementById("editState").value,
            country : document.getElementById("editCountry").value,
            username: document.getElementById("editUsername").value,
            password: document.getElementById("editpassword").value
        }
        return user

    // GENDER FUNCTION
        function gender(){
            let male = document.getElementById("editMale")
            let female = document.getElementById("editFemale")
            if(male.checked ==true){
                return male.value
            }else if(female.checked== true){
                return female.value
            }
        }
    // END GENDER FUNCTION
    }

// END EDITED OBJECT FOR PUT OPERATION

// POST EMPLOYEE AVATAR
    async function uploadAvatar(id,profPic){
        let avatarData = new FormData()
        avatarData.append("avatar",profPic)
        try{
            const res = await fetch("http://localhost:4000/employee/"+id+"/editAvatar",{
                method: "PUT",
                body : avatarData
            })
        }catch(error){
            console.log(error);
    }}
// END POST EMPLOYEE AVATAR

// EMPLOYEE IMAGE PREVIEW
    changeDp.addEventListener("change",function(){
        const [file] = changeDp.files
        if (file) {
            EdEditEmployeeDp.src = URL.createObjectURL(file)
        }
    })
// END EMPLOYEE IMAGE PREVIEW

// END EDIT EMPLOYEE FORM

// SUCCESS & FAIL MESSAGES
let modalEl = document.getElementById("modal")
let modalMsg = document.getElementById("successMessage")
    function hide(){
        modalEl.style.display = "none"
    }
// END SUCCESS & FAIL MESSAGES

// HIDE FORMS WHEN CLICK OVERLAY
let overlay = document.getElementById("overlay")
overlay.addEventListener("click",function(){
    // edit employee form hide
    edEditEmployeeForm.classList.replace('fadeIn', 'fadeOut')
        setTimeout(()=>{
            edEditEmployeeForm.style.display="none"},100)
    setTimeout(()=>{
        edEditEmployeeForm.classList.replace('fadeOut', 'fadeIn');
    },1500)})

// EDIT EMPLOYEE FORM VALIDATION
function editEmployeeValidation(){
    let addEmployeeValidationSuccess = true

    if(!document.getElementById("editSalutation").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDSal").style.display= "block"
    }
    if(!document.getElementById("editFirstName").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDFN").style.display= "block"
    } 
    if(!document.getElementById("editLastName").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDLN").style.display= "block"
    }
    if(!document.getElementById("editEmail").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDEmail").style.display= "block"
    }
    if(!document.getElementById("editPhone").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDMob").style.display= "block"
    }
    if(!document.getElementById("editDob").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDDob").style.display= "block"
    }
    if(!document.getElementById("editAddress").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDAddress").style.display= "block"
    }
    if(!document.getElementById("editCity").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDCity").style.display= "block"
    }
    if(!document.getElementById("editState").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDState").style.display= "block"
    }
    if(!document.getElementById("editCountry").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDCountry").style.display= "block"
    }
    if(!document.getElementById("editUsername").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDUN").style.display= "block"
    }
    if(!document.getElementById("editpassword").value){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDPass").style.display= "block"
    }
    if(document.getElementById("editMale").checked==false && document.getElementById("editFemale").checked==false){
        addEmployeeValidationSuccess = false
        document.getElementById("valEDGender").style.display= "block"
    }
    
    if(addEmployeeValidationSuccess==true){ 
        editEmployeePutMethod() //calling put function
}}

// REMOVING VALIDATION MESSAGE FROM EDIT EMPLOYEE FORM
    document.getElementById("editSalutation").addEventListener("change",function(){
        if(!document.getElementById("editSalutation").value==""){
            document.getElementById("valEDSal").style.display= "none"
        }else{
            document.getElementById("valEDSal").style.display= "block"
    }})
    document.getElementById("editCountry").addEventListener("change",function(){
        if(!document.getElementById("editCountry").value==""){
        document.getElementById("valEDCountry").style.display= "none"
    }else{
        document.getElementById("valEDCountry").style.display= "block"
    }})
    document.getElementById("editState").addEventListener("change",function(){
        if(!document.getElementById("editState").value==""){
            document.getElementById("valEDState").style.display= "none"
        }else{
            document.getElementById("valEDState").style.display= "block"
    }})
    document.getElementById("editDob").addEventListener("change",function(){
        if(!document.getElementById("editDob").value==""){
            document.getElementById("valEDDob").style.display= "none"
        }else{
            document.getElementById("valEDDob").style.display= "block"
    }})
    document.getElementById("editMale").addEventListener("change",function(){
        if(!document.getElementById("editMale")==""){
            document.getElementById("valEDGender").style.display= "none"
        }else{
            document.getElementById("valEDGender").style.display= "block"
    }})
    document.getElementById("editFemale").addEventListener("change",function(){
        if(!document.getElementById("editFemale")==""){
            document.getElementById("valEDGender").style.display= "none"
        }else{
            document.getElementById("valEDGender").style.display= "block"
    }})
    document.getElementById("editPhone").addEventListener("keyup",function(){
        const phone = /^\d{10}$/;
        if(document.getElementById("editPhone").value.length !== 10){
            document.getElementById("valEDMob").style.display= "block"
        }else{
            document.getElementById("valEDMob").style.display= "none"
    }})
    function removeValMessage(inputId,valId){ //common function for some inputs
        if(!document.getElementById(inputId).value==""){
            document.getElementById(valId).style.display= "none"
        }else{
            document.getElementById(valId).style.display= "block"
    }}
// END REMOVING VALIDATION MESSAGE FROM EDIT EMPLOYEE FORM

// END EDIT EMPLOYEE FOR VALIDATION

// FORM HIDING FN WHEN CLICK OVERLAY
overlayEl.addEventListener("click",function(){
    overlayEl.style.display = "none"
    EdDeleteForm.style.display = "none"
    edEditEmployeeForm.style.display = "none"
})
//END FORM HIDING FN WHEN CLICK OVERLAY