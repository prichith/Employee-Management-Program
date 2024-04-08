//EMPLOYEES PAGE
let ellipsisBtn =document.getElementById("ellipsis")
let optionBox = document.getElementById("optionBox")
let addEmployeeOpenBtn = document.getElementById("addEmployeeOpen")
let tableInp = document.getElementById("table-body")
let overlayEl = document.getElementById("overlay")
let addEmployeeForm = document.getElementById("addEmployeeId")
let employeeList = document.getElementById("employeeList")
let modalEl = document.getElementById("modal")
let modalMsg = document.getElementById("successMessage")
let allEmployees;  // globally assigned all employees for Search Operation
let actionButton; // assign optionBox div into it
let totalEmployee //total employees in db

//BUTTONS AND FUNCTIONS
addEmployeeOpenBtn.addEventListener("click",async function(){
    addEmployeeForm.style.display = "block"
    overlayEl.style.display = "block"
})

const optionBoxEl = (actions)=>{
    actions.classList.toggle("pops");
    overlayOptionBox.style.display = "block"
    setTimeout(()=>{ actionButton = actions },500)
    if(actionButton) {
        actionButton.classList.remove("pops")  
}
}
// HIDE FORMS WWHEN CLICK OVERLAY
overlayEl.addEventListener("click",async function(){
    overlayEl.style.display="none"
    // add employee form hide
        addEmployeeForm.classList.replace('fadeIn', 'fadeOut')
        await setTimeout(()=>{ addEmployeeForm.style.display="none"},100)
        setTimeout(()=>{ addEmployeeForm.classList.replace('fadeOut', 'fadeIn') },1500)
    // edit employee form hide
        editEmployeeForm.classList.replace('fadeIn', 'fadeOut')
        await setTimeout(()=>{ editEmployeeForm.style.display="none"},100)
        setTimeout(()=>{ editEmployeeForm.classList.replace('fadeOut', 'fadeIn') },1500)
    // delete employee form hide
        deleteEmployeeFormEl.classList.replace('fadeIn', 'fadeOut')
        setTimeout(()=>{ deleteEmployeeFormEl.style.display="none"},100)
        setTimeout(()=>{ deleteEmployeeFormEl.classList.replace('fadeOut', 'fadeIn') },1500)
})
//END EMPLOYEE PAGE

// DISPLAY EMPLOYEES IN TABLE BODY
function displayEmployees(value,firstIndex){
    let tableData= ""
    value.map((employee,index)=>{
    tableData += `<tr>
    <td>#${salZero(firstIndex+index+1)}${firstIndex+index+1}</td>
    <td><img src="../img/public/avatars/${employee.avatar}" alt=profilepic class="rounded-circle mr-2 mx-2" height=30  width=30/>${employee.salutation}${employee.firstname} ${employee.lastname}</td>
    <td>${employee.email}</td>
    <td>${employee.phone}</td>
    <td>${employee.gender}</td>
    <td>${removeTimeFromDOB(employee.dob)}</td>
    <td>${employee.country}</td>
    <td>
        <button onclick="optionBoxEl(this.nextElementSibling)" class="ellipsis-div" ><i id="ellipsis" class="fa-solid fa-ellipsis ellipsis"></i></button>
        <div id="optionBox${index}" class="optionBox">
            <a href="/employeeDetails?id=${employee._id}" target="blank"><button onclick="viewDetails('${employee._id}')" class="optionBoxBtn"><span class="material-symbols-outlined">visibility</span><p>View Details</p></button></a>
            <button onclick="editDetails('${employee._id}'); " class="optionBoxBtn"><span class="material-symbols-outlined">edit</span><p>Edit</p></button>
            <button onclick="deleteDetails('${employee._id}')" class="optionBoxBtn"><span class="material-symbols-outlined">delete</span><p>Delete </p></button>
        </div>
    </td>
    </tr>`
    })
    function removeTimeFromDOB(birthdate){
        let array = []
        let date = birthdate.split('T')
        array.push(date[0].split('-').reverse().join('-'))
        return array[0]
  }
      // First number of SL
      function salZero(slno) {
        return slno < 10 ? 0 : "";
    }
    //END first number of SL
    tableInp.innerHTML = tableData;
}
//END DISPLAY EMPLOYEES IN TABLE BODY

// GET ALL DEFAULT EMPLOYEES
let searchField
let searchInput
async function allUserData(){
    try{
        const response = await fetch(`http://localhost:4000/employee/1/${employeeList.value}/${searchInput}`)
        const objectData = await response.json();
        pagination(objectData.data,objectData.totalEmployee,objectData.firstIndex);
        allEmployees = objectData.data;
        totalEmployee = objectData.totalEmployee
    }catch (error){
        console.error("Error fetching data:", error);
}}
allUserData()
// END GET ALL DEFAULT EMPLOYEES

// SEARCH OPERATION
const searchEmployee = async () => {
    searchInput = document.getElementById("search").value || 'undefined'
    searchInput ? searchField = true : searchField = false
    try {
        const result = await fetch(`http://localhost:4000/employee/1/${employeeList.value}/${searchInput}`);
        let response = await result.json()
        pagination(response.data,response.totalEmployee,response.firstIndex)
    } catch (error) {
        console.log('inside catch');
    }}
//END SEARCH OPERATION

// DOB REVERSING FUNCTION
function dob(birthDay){
    let date = birthDay.split('-').reverse().join('-');
    return date;
}
//END DOB REVERSING FUNCTION

// POST AVATAR
async function uploadAvatar(id,employeeAvatar){
    let avatarData = new FormData()
    avatarData.append("avatar",employeeAvatar)
    try{
    const res = await fetch("http://localhost:4000/employee/"+id+"/avatar",
    { method: "PUT", body : avatarData })
    .then((response) => response.ok ? allUserData() : null )
}catch(error){ console.log(error) }}

// ADD EMPLOYEE FORM 
let salutationEl = document.getElementById("salutation").value
let firstNameEl = document.getElementById("firstName").value
let lastNameEl = document.getElementById("lastName").value
let emailEl = document.getElementById("email").value
let phoneEl = document.getElementById("phone").value
let dobEl = document.getElementById("dob").value
let maleEl = document.getElementById("male").value
let femaleEl = document.getElementById("female").value
let qualificationsEl = document.getElementById("qualifications").value
let addressEl = document.getElementById("address").value
let cityEl = document.getElementById("city").value
let stateEl = document.getElementById("state").value
let countryEl = document.getElementById("country").value
let usernameEl =document.getElementById("username").value
let passwordEl =document.getElementById("password").value
let addEmployeeDiv = document.getElementById("addEmployeeFormUpload")
let addEmployeePreview = document.getElementById("addEmployeeFormPrev")
let addEmployeeChangeDpBtn = document.getElementsByClassName("addEmployeeChangedp")
let addEmployeeAvatar 
let addEmployeeDp = document.getElementById("addEmployeeDp")

// BUTTONS AND ITS FUNCTIONS
let addEmployeeCloseBtn = document.getElementById("addEmployeeClose")
let addEmployeeCancelBtn = document.getElementById("addEmployeeCancel")
let addEmployeeAddBtn = document.getElementById("addEmployeeAdd")
let addEmployeeAvatarInput = document.getElementById("upload")

addEmployeeAvatarInput.addEventListener('change' , () => { //avatar input
    addEmployeeAvatar = addEmployeeAvatarInput.files[0];
    addFormImagePreview()
})
addEmployeeCloseBtn.addEventListener("click",function(){
    addEmployeeForm.classList.replace('fadeIn', 'fadeOut')
    setTimeout(()=>{ addEmployeeForm.style.display="none"},100)
    setTimeout(()=>{ addEmployeeForm.classList.replace('fadeOut', 'fadeIn') },1500)
    overlayEl.style.display = "none"
})
addEmployeeCancelBtn.addEventListener("click",function(){
    addEmployeeForm.classList.replace('fadeIn', 'fadeOut')
    setTimeout(()=>{ addEmployeeForm.style.display="none"},100)
    setTimeout(()=>{ addEmployeeForm.classList.replace('fadeOut', 'fadeIn')},1500)
    overlayEl.style.display = "none"
})
//END BUTTONS AND ITS FUNCTIONS

// AVATAR PREVIEW
    function addFormImagePreview(){
        const [file] = addEmployeeAvatarInput.files
        if (file) {
            addEmployeeDiv.style.display = "none"
            addEmployeeDp.src = URL.createObjectURL(file)
            addEmployeePreview.style.display = "block"
    }}
//ADD EMPLOYEE FORM CLOSE
// // POST ADD EMPLOYEE FORM
    function addEmployee(){
        try {
            let result = fetch(`http://localhost:4000/employee`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(newEmployeeObject()) })
                .then((response)=>{return response.json()})
                .then((data)=>{
                    if(addEmployeeAvatar) uploadAvatar(data.id,addEmployeeAvatar);
                    document.getElementById("successMessage").innerHTML = data.message;
                    document.getElementById("modal").style.display = "block";
                    setTimeout(() => {
                        document.getElementById("modal").style.display = "none";
                    }, 1500);
                })
        } catch (error) {
            console.log('fetch failed');
        }
        setTimeout(() => { allUserData() }, 500); //refresh the page 
        overlayEl.style.display = "none"
        addEmployeeForm.style.display = "none"
    }
    function newEmployeeObject(){
        let user = {
            salutation : document.getElementById("salutation").value,
            firstname : document.getElementById("firstName").value,
            lastname : document.getElementById("lastName").value,
            email : document.getElementById("email").value,
            phone : document.getElementById("phone").value,
            dob : document.getElementById("dob").value,
            gender : gender(),
            qualifications : document.getElementById("qualifications").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
            state : document.getElementById("state").value,
            country : document.getElementById("country").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
    return user
    // GENDER FUNCTION
    function gender(){
        let male = document.getElementById("male")
        let female = document.getElementById("female")
        if(male.checked ==true){ return male.value }
        else if(female.checked== true){ return female.value }
    }
}


// EDIT EMPLOYEE FORM
    let editEmployeeCloseBtn = document.getElementById("editEmployeeClose")
    let editEmployeeCanceleBtn = document.getElementById("editEmployeeCancel")
    let editEmployeeForm = document.getElementById("editEmployeeForm")
    let editEmployeeId //globally assigned for put method and Post avatar
    let changeDp = document.getElementById("changedp")
    let profPic ; //globally storing avatar
    let editEmployeeSaveBtn = document.getElementById("editEmployeeSave")
    let editEmployeeDp = document.getElementById("editEmployeeDp")

// BUTTONS AND ITS FUNCTIONS   
    changeDp.addEventListener("change",editFormImagePreview)     
    editEmployeeCloseBtn.addEventListener("click",function(){
        editEmployeeForm.classList.replace('fadeIn', 'fadeOut')
         setTimeout(()=>{ editEmployeeForm.style.display="none"},100)
        setTimeout(()=>{ editEmployeeForm.classList.replace('fadeOut', 'fadeIn') },1500)
        overlayEl.style.display = "none"
    })
    editEmployeeCanceleBtn.addEventListener("click",function(){
        editEmployeeForm.classList.replace('fadeIn', 'fadeOut')
        setTimeout(()=>{ editEmployeeForm.style.display="none"},100)
        setTimeout(()=>{ editEmployeeForm.classList.replace('fadeOut', 'fadeIn')},1500)
        overlayEl.style.display = "none"
    })
    changeDp.addEventListener('change' , () => {
        profPic = changeDp.files[0];
    })
//END BUTTONS AND ITS FUNCTIONS
// FILLED EDIT FORM
    async function editDetails(id){
        optionBoxHide()
        try{
            const response = await fetch("http://localhost:4000/employee/"+ new URLSearchParams({id : `${id}`}))
            .then((data)=>{ return data.json() })
            .then((employee)=>{
            editEmployeeId = id;
        let male = document.getElementById("editMale")
        let female = document.getElementById("editFemale")
        document.getElementById("editSalutation").value = employee.salutation
        document.getElementById("editFirstName").value = employee.firstname
        document.getElementById("editLastName").value = employee.lastname
        document.getElementById("editUsername").value = employee.username
        document.getElementById("editPassword").value = employee.password
        document.getElementById("editEmail").value = employee.email
        document.getElementById("editPhone").value = employee.phone
        document.getElementById("editDob").value = removeTimeFromDOB(employee.dob) //yy-mm-dd format
        employee.gender === 'Male' ? male.checked = true : female.checked = true;
        document.getElementById("editQualifications").value = employee.qualifications
        document.getElementById("editAddress").value = employee.address
        document.getElementById("editCountry").value = employee.country
        document.getElementById("editState").value = employee.state
        document.getElementById("editCity").value = employee.city
        document.getElementById("editEmployeeDp").src = `../img/public/avatars/${employee.avatar}`
        })
        }catch (error){
            console.error("Error fetching data:", error);
        }

    function removeTimeFromDOB(birthdate){
        let array = []
        let date = birthdate.split('T')
        array.push(date[0])
        return array[0]
      }
        overlayEl.style.display = "block"
        editEmployeeForm.style.display = "block";
}
// AVATAR PREVIEW
function editFormImagePreview(){
    const [file] = changeDp.files
    if (file) editEmployeeDp.src = URL.createObjectURL(file)
}
// PUT METHOD IN EDIT EMPLOYEE FORM
     async function editEmployeePutMethod(){
         fetch(`http://localhost:4000/employee/${editEmployeeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(editedObject()) })
            .then((response) => {
                if (!response.ok) {
                return response.json().then((errorResponse) => {
                    modalMsg.innerText = "Employee updation failed !"
                    modalEl.style.backgroundColor = "#d93b3b"
                    modalEl.style.display = "block"
                    setTimeout(hide,3000)
                })}
                else{
                    if(profPic) uploadAvatar(editEmployeeId,profPic)  // update avatar
                    return response.json().then((response)=>{
                    modalMsg.innerText = response.message
                    modalEl.style.backgroundColor = "#3ea31a"
                    modalEl.style.display = "block"
                    setTimeout(hide,1000) 
                    allUserData()                    
                    })
                }})
        editEmployeeForm.style.display = "none";
        overlayEl.style.display= "none"
    }
// OBJECT FOR PUT METHOD
    function editedObject(){
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
            password: document.getElementById("editPassword").value
        }
    return user
    // GENDER FUNCTION
    function gender(){
        let male = document.getElementById("editMale")
        let female = document.getElementById("editFemale")
        if(male.checked ==true){ return male.value }
        else if(female.checked== true){ return female.value }
    }
}

// DELETE EMPLOYEE FORM
let deleteEmployeeFormEl = document.getElementById("deleteEmployeeForm")
let deleteEmployeeCloseBtn = document.getElementById("deleteEmployeeClose")
let deleteEmployeeCancelBtn = document.getElementById("deleteEmployeeCancel")
let deleteEmployeeDeleteBtn = document.getElementById("deleteEmployeeDelete")

// BUTTONS AND FUNCTIONS
    deleteEmployeeCloseBtn.addEventListener("click",function(){
        deleteEmployeeFormEl.classList.replace('fadeIn', 'fadeOut')
        setTimeout(()=>{ deleteEmployeeFormEl.style.display="none"},100)
        setTimeout(()=>{ deleteEmployeeFormEl.classList.replace('fadeOut', 'fadeIn') },1500)
        overlayEl.style.display = "none"
    })
    deleteEmployeeCancelBtn.addEventListener("click",function(){
        deleteEmployeeFormEl.classList.replace('fadeIn', 'fadeOut')
        setTimeout(()=>{ deleteEmployeeFormEl.style.display="none"},100)
        setTimeout(()=>{ deleteEmployeeFormEl.classList.replace('fadeOut', 'fadeIn') },1500)
        overlayEl.style.display = "none"
    })
// END BUTTONS AND FUNCTIONS

// DELETE METHOD 
    function deleteDetails(id){
        optionBoxHide()
        deleteEmployeeFormEl.style.display= "block"
        overlayEl.style.display ="block"
        deleteEmployeeDeleteBtn.addEventListener("click",function(){
            fetch("http://localhost:4000/employee/"+new URLSearchParams({id : `${id}`}), {
            method: "DELETE"
            })
            .then((response) => {
            if (!response.ok) {
            return response.json().then((errorResponse) => {
                modalMsg.innerText = "Employee deletion failed !"
                modalEl.style.backgroundColor = "#d93b3b"
                modalEl.style.display = "block"
                setTimeout(hide,3000)
                console.error("Server validation errors:", errorResponse.errors);
            })}else{
                // transition for form hide
                deleteEmployeeFormEl.classList.replace('fadeIn', 'fadeOut')
                setTimeout(()=>{ deleteEmployeeFormEl.style.display="none"},100)
                setTimeout(()=>{ deleteEmployeeFormEl.classList.replace('fadeOut', 'fadeIn') },1500)
                }
            return response.json();
            })
            .then((responseData) => {
                modalMsg.innerText = responseData.message
                modalEl.style.backgroundColor = "#3ea31a"
                modalEl.style.display = "block"
                setTimeout(hide,1500)
                setTimeout(() => { allUserData() }, 1000);
            })
            overlayEl.style.display= "none"
    })}
// EMPLOYEELIST BUTTON
employeeList.addEventListener("change",async function(){
    try {
            let result = await fetch(`http://localhost:4000/employee/1/${employeeList.value}/${searchInput}`)
            let datas = await result.json();
            pagination(datas.data, datas.totalEmployee, datas.firstIndex)            
        }
     catch (error) { console.error("An error occurred:", error) }
})

// PAGINATION SECTION
let pagesDiv = document.getElementById("pages")
let employeeCount = employeeList.value
let pages
function pagination(data,count,firstIndex){
     pages = Math.ceil(count/employeeList.value)
    // CREATING PAGES IN PAGINATION
    pagesDiv.innerHTML = ""
    for(let i = 1; i <= pages ; i++){
        let newSpan = document.createElement('span')
        newSpan.textContent = i
        newSpan.id = 'page'+i
        newSpan.onclick = function changePage() {
            pageBtnActive(newSpan,pages)
            employeesPerPage(i);
        };
        pagesDiv.appendChild(newSpan);
        document.getElementById('page1') ? document.getElementById('page1').classList.add('pageActive') : null;
    }
    //END CREATING PAGES IN PAGINATION
    displayEmployees(data,firstIndex)
}
    // ONCLICK FUNCTION OF THE PAGES
    async function employeesPerPage(pageNum){
        try {
                let result = await fetch(`http://localhost:4000/employee/${pageNum}/${employeeList.value}/${searchInput}`);
                let objectData = await result.json();
                displayEmployees(objectData.data,objectData.firstIndex)
        } catch (error) { console.log('fetching failed'); }
    }
    //END ONCLICK FUNCTION OF THE PAGES
    // ACTIVE PAGE(COLOR) IN PAGINATION
    function pageBtnActive(activePage,pageCount){
        for(let i=1;i<=pageCount;i++){
            if(document.getElementById('page'+i).classList.contains('pageActive')){
                document.getElementById('page'+i).classList.remove('pageActive')
            }}
        activePage.classList.add('pageActive')
    }

// PREV PAGE BUTTON 
    document.getElementById('prevPage').addEventListener("click",function(){
    for(let i=1;i<=pages;i++){
        if(document.getElementById('page'+i).classList.contains('pageActive')){
        document.getElementById('page'+i).classList.remove('pageActive')
        document.getElementById('page'+(i-1)).classList.add('pageActive')
        employeesPerPage(i-1);
    }}})
// NEXT PAGE BUTTON
document.getElementById("nextPage").addEventListener("click",function(){
    for(let i=1;i<=pages;i++){
        if(document.getElementById('page'+i).classList.contains('pageActive')){
            document.getElementById('page'+i).classList.remove('pageActive')
            document.getElementById('page'+(i+1)).classList.add('pageActive')
            employeesPerPage(i+1); // fetch data for next page
        if(document.getElementById('page'+i)) break;
        }}})
// hide popup message
function hide(){
    modalEl.style.display = "none"
}
// VALIDATION

//  SOME COMMON REMOVING VALIDATION MESSAGE
function removeValMessage(inputId,valId){
    if(!document.getElementById(inputId).value==""){
        document.getElementById(valId).style.display= "none"
    }else{
        document.getElementById(valId).style.display= "block"
}}
    // END SOME COMMON REMOVING VALIDATION MESSAGE

// ADD EMPLOYEE FORM VALIDATION
    function addEmployeeValidation(){
        let addEmployeeValidationSuccess = true

        if(!document.getElementById("salutation").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valSal").style.display= "block"
        }
        if(!document.getElementById("firstName").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valFN").style.display= "block"
        } 
        if(!document.getElementById("lastName").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valLN").style.display= "block"
        }
         if(!document.getElementById("email").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEmail").style.display= "block"
        }
         if(!document.getElementById("phone").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valMob").style.display= "block"
        }
         if(!document.getElementById("dob").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valDob").style.display= "block"
        }
         if(!document.getElementById("address").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valAddress").style.display= "block"
        }
         if(!document.getElementById("city").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valCity").style.display= "block"
        }
         if(!document.getElementById("state").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valState").style.display= "block"
        }
         if(!document.getElementById("country").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valCountry").style.display= "block"
        }
         if(!document.getElementById("username").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valUN").style.display= "block"
        }
         if(!document.getElementById("password").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valPass").style.display= "block"
        }
        if(document.getElementById("male").checked==false && document.getElementById("female").checked==false){
            addEmployeeValidationSuccess = false
            document.getElementById("valGender").style.display= "block"
        }
        if(addEmployeeValidationSuccess == true){ 
            addEmployee() //call posting function
        }}

    // REMOVING VALIDATION MESSAGE FROM ADD EMPLOYEE FORM
        document.getElementById("salutation").addEventListener("change",function(){
            if(!document.getElementById("salutation").value==""){
                document.getElementById("valSal").style.display = "none"
            }else{
                document.getElementById("valSal").style.display = "block"
        }})
        document.getElementById("country").addEventListener("change",function(){
            if(!document.getElementById("country").value==""){
            document.getElementById("valCountry").style.display= "none"
        }else{
            document.getElementById("valCountry").style.display= "block"
        }})
        document.getElementById("state").addEventListener("change",function(){
            if(!document.getElementById("state").value==""){
                document.getElementById("valState").style.display= "none"
            }else{
                document.getElementById("valState").style.display= "block"
        }})
        document.getElementById("dob").addEventListener("change",function(){
            if(!document.getElementById("dob").value==""){
                document.getElementById("valDob").style.display= "none"
            }else{
                document.getElementById("valDob").style.display= "block"
        }})
        document.getElementById("male").addEventListener("change",function(){
            if(!document.getElementById("male")==""){
                document.getElementById("valGender").style.display= "none"
            }else{
                document.getElementById("valGender").style.display= "block"
        }})
        document.getElementById("female").addEventListener("change",function(){
            if(!document.getElementById("female")==""){
                document.getElementById("valGender").style.display= "none"
            }else{
                document.getElementById("valGender").style.display= "block"
        }})
        document.getElementById("phone").addEventListener("keyup",function(){
            const phone = /^\d{10}$/;
            if(document.getElementById("phone").value.length !== 10){
                document.getElementById("valMob").style.display= "block"
            }else{
                document.getElementById("valMob").style.display= "none"
            }
    })
    // END REMOVING VALIDATION MESSAGE FROM ADD EMPLOYEE FORM

// END ADD EMPLOYEE FORM VALIDATION

// EDIT EMPLOYEE FORM VALIDATION
    function editEmployeeValidation(){
        let addEmployeeValidationSuccess = true

        if(!document.getElementById("editSalutation").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditSal").style.display= "block"
        }
        if(!document.getElementById("editFirstName").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditFN").style.display= "block"
        } 
        if(!document.getElementById("editLastName").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditLN").style.display= "block"
        }
         if(!document.getElementById("editEmail").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditEmail").style.display= "block"
        }
         if(!document.getElementById("editPhone").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditMob").style.display= "block"
        }
         if(!document.getElementById("editDob").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditDob").style.display= "block"
        }
         if(!document.getElementById("editAddress").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditAddress").style.display= "block"
        }
         if(!document.getElementById("editCity").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditCity").style.display= "block"
        }
         if(!document.getElementById("editState").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditState").style.display= "block"
        }
         if(!document.getElementById("editCountry").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditCountry").style.display= "block"
        }
         if(!document.getElementById("editUsername").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditUN").style.display= "block"
        }
         if(!document.getElementById("editPassword").value){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditPass").style.display= "block"
        }
        if(document.getElementById("editMale").checked==false && document.getElementById("editFemale").checked==false){
            addEmployeeValidationSuccess = false
            document.getElementById("valEditGender").style.display= "block"
        }
        if(addEmployeeValidationSuccess==true){ 
            editEmployeePutMethod() //calling put function
    }}

        // REMOVING VALIDATION MESSAGE FROM EDIT EMPLOYEE FORM
            document.getElementById("editSalutation").addEventListener("change",function(){
                if(!document.getElementById("editSalutation").value==""){
                    document.getElementById("valEditSal").style.display= "none"
                }else{
                    document.getElementById("valEditSal").style.display= "block"
            }})
            document.getElementById("editCountry").addEventListener("change",function(){
                if(!document.getElementById("editCountry").value==""){
                document.getElementById("valEditCountry").style.display= "none"
            }else{
                document.getElementById("valEditCountry").style.display= "block"
            }})
            document.getElementById("editState").addEventListener("change",function(){
                if(!document.getElementById("editState").value==""){
                    document.getElementById("valEditState").style.display= "none"
                }else{
                    document.getElementById("valEditState").style.display= "block"
            }})
            document.getElementById("editDob").addEventListener("change",function(){
                if(!document.getElementById("editDob").value==""){
                    document.getElementById("valEditDob").style.display= "none"
                }else{
                    document.getElementById("valEditDob").style.display= "block"
            }})
            document.getElementById("editMale").addEventListener("change",function(){
                if(!document.getElementById("editMale")==""){
                    document.getElementById("valEditGender").style.display= "none"
                }else{
                    document.getElementById("valEditGender").style.display= "block"
            }})
            document.getElementById("editFemale").addEventListener("change",function(){
                if(!document.getElementById("editFemale")==""){
                    document.getElementById("valEditGender").style.display= "none"
                }else{
                    document.getElementById("valEditGender").style.display= "block"
            }})
            document.getElementById("editPhone").addEventListener("keyup",function(){
                const phone = /^\d{10}$/;
                if(document.getElementById("editPhone").value.length !== 10){
                    document.getElementById("valEditMob").style.display= "block"
                }else{
                    document.getElementById("valEditMob").style.display= "none"
                }})
        // END REMOVING VALIDATION MESSAGE FROM EDIT EMPLOYEE FORM
// END EDIT EMPLOYEE FOR VALIDATION
// END VALIDATION

//  OPTION BOX HIDE FUNCTION
    let overlayOptionBox = document.getElementById("overlayOptionBox")
    overlayOptionBox.addEventListener("click",optionBoxHide)
    function optionBoxHide(){
        deleteEmployeeFormEl.style.display="none";
        overlayOptionBox.style.display = "none";
        overlayEl.style.display="none";
        editEmployeeForm.style.display="none";
        for(let i=0;i<employeeList.value;i++){
            let box = document.getElementById("optionBox"+i)
            if(box == undefined){ break }
            if(box.classList.contains("pops"))  box.classList.remove("pops")
    }}
