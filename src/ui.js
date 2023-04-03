export class UI {
    constructor() {
        this.employee = document.getElementById("employee");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
        this.updateButton = document.getElementById("update");
        this.submtButton = document.getElementById("submit");
        this.form = document.getElementById("employee-form");
    }

    AddAllEmployeUI(response) {
        let result;

        response.forEach(responses => {
            result += `<tr>                                 
                    <td>${responses.name}</td>
                    <td>${responses.department}</td>
                    <td>${responses.salary}</td>
                    <td>${responses.id}</td>
                    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
                </tr>`;
        });

        this.employee.innerHTML = result;
    }

    clearInput() {
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
    }

    POSTAllEmployeUI(response) {
        this.employee.innerHTML += ` <tr>                                 
                    <td>${response.name}</td>
                    <td>${response.department}</td>
                    <td>${response.salary}</td>
                    <td>${response.id}</td>
                    <td><a href="" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
                </tr>`;
    }
    DeleteEmployeeUI(deletID) {
        deletID.remove();
    }
    MesseageUI(color, messeage) {
        const div = document.createElement("div");
        const br = document.createElement("br");
        div.className = `alert alert-${color}`;
        div.textContent = messeage;
        this.form.appendChild(br);
        this.form.appendChild(div);
        setTimeout(function () {
            div.remove();
        }, 1000)


    }
    toggleUpdateUI(target) {
        if (this.updateButton.style.display === "none") {
            this.updateButton.style.display = "block";

            this.AddAllEmployeINfo(target);
        }
        else {
            this.updateButton.style.display = "none";

        }
    }

    AddAllEmployeINfo(target) {
        const list = target.children;

        this.nameInput.value = list[0].textContent;
        this.departmentInput.value = list[1].textContent;
        this.salaryInput.value = list[2].textContent;

    }
    UpdateEmployeeUI(employee, parent) {
        parent.innerHTML = ` <tr>                                 
       <td>${employee.name}</td>
       <td>${employee.department}</td>
       <td>${employee.salary}</td>
       <td>${employee.id}</td>
       <td><a href="" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
       <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
   </tr>`;
        this.clearInput();
    }

}
