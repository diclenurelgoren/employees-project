/* npx json-server --watch fake-api/employee.json böyle çalışıyor */
import { Request } from "./request.js";
import { UI } from "./ui.js";

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeList = document.getElementById("employee");
const updateButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let UpdateState = null;

eventListener();
function eventListener() {
    document.addEventListener("DOMContentLoaded", getallEmployee);
    form.addEventListener("submit", postallEmployee);
    employeeList.addEventListener("click", UpdateOrDelete);
    updateButton.addEventListener("click", UpdateList);
}

function getallEmployee() {

    request.get()
        .then(response => {
            ui.AddAllEmployeUI(response);
        })
        .catch(err => console.log(err));
}

function postallEmployee(e) {

    const Employeename = nameInput.value.trim();
    const Employeedepartment = departmentInput.value.trim();
    const Employeesalary = salaryInput.value.trim();

    if (Employeedepartment === "" || Employeename === "" || Employeesalary === "") {
        alert("Lütfen alanları doldurun.");
    }
    else {
        request.post({ name: Employeename, department: Employeedepartment, salary: Employeesalary })
            .then(response => {
                ui.POSTAllEmployeUI(response);
                ui.MesseageUI("success", "Çalışan Başarıyla Eklendi");
            })
            .catch(err => console.log(err));
    }


    ui.clearInput();
    e.preventDefault();
}

function UpdateOrDelete(e) {

    if (e.target.id === "update-employee") {
        UpdateEmployee(e.target.parentElement.parentElement);
    }
    else if (e.target.id === "delete-employee") {
        DeleteEmployee(e.target);
    }
}

function DeleteEmployee(delet) {

    const id = delet.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
        .then(message => {
            ui.DeleteEmployeeUI(delet.parentElement.parentElement);
            ui.MesseageUI("danger", "Başarıyla Silindi");
        })
        .catch(err => console.log(err));
}

function UpdateEmployee(updat) {
    ui.toggleUpdateUI(updat);

    if (UpdateState === null) {
        UpdateState = {
            UpdateID: updat.children[3].textContent,
            UpdateParent: updat
        }
    }
    else {
        UpdateState = null;
    }
}
function UpdateList() {
    if (UpdateState) {
        //güncelleme
        const data = { name: nameInput.value.trim(), department: departmentInput.value.trim(), salary: Number(salaryInput.value.trim()) };

        request.put(UpdateState.UpdateID, data)
            .then(response => {
                ui.UpdateEmployeeUI(response, UpdateState.UpdateParent);
                ui.MesseageUI("success", "Çalışan Bilgileri Başarıyla Güncellendi");
            })
            .catch(err => console.log(err));

    }

}


