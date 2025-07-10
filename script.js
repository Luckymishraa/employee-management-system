const form = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");

const employees =[];
// load from localstorage
const savedEmployees = localStorage.getItem("employees");
if(savedEmployees){
    employees.push(...JSON.parse(savedEmployees));
    renderEmployees();
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const position = document.getElementById("position").value.trim();
    const department = document.getElementById("department").value.trim();
    const salary = document.getElementById("salary").value.trim();

    if(!name || !position || !department || !salary){
        alert("Please fill in all fields.");
        return;
    }

    const employee = {
        id: Date.now(),
        name,
        position,
        department,
        salary: `₹${salary}`
    };

    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees)); //save here
    form.reset();
    renderEmployees();
})


document.getElementById("searchInput").addEventListener("input", (e)=>{
    const searchTerm = e.target.value;
    renderEmployees(searchTerm)
})

function updateSummary(list) {
    const summaryBox = document.getElementById("summary");

    if(list.length === 0){
        summaryBox.textContent = "No employees to summarize.";
        return;
    }

    const totalSalary = list.reduce((sum,emp) =>{
        const numericSalary = parseInt(emp.salary.replace("₹", "").replace(/,/g/ ""));
        return sum + numericSalary;
    }, 0);

    const avgSalary = totalSalary / list.length;
    summaryBox.innerHTML= `
    Total Employees: ${list.length} |
    Total Salary: ₹${totalSalary.toLocaleString()} |
    Average Salary: ₹${Math.round(avgSalary).toLocaleString()}
    `
}

function renderEmployees(searchTerm = "") {
    employeeList.innerHTML = "";

    const filtered = employees.filter(emp =>{
        const keyword = searchTerm.toLowerCase();
        return(
            emp.name.toLowerCase().includes(keyword) ||
            emp.position.toLowerCase().includes(keyword) ||
            emp.department.toLowerCase().includes(keyword)
        );
    });

    filtered.forEach((emp, index )=> {
        const card = document.createElement("div");

        card.className = "bg-white p-4 mb-4 rounded-xl shadow hover:shadow-lg transition border-l-4 border-gray-500 flex justify-between items-start gap-4";
        card.innerHTML = `
        <h2 class="text-xl font-semibold"> ${emp.name} </h2>
        <p class="text-gray-600"> ${emp.position} - ${emp.department} </p>
        <p class="text-green-600 font-bold"> ${emp.salary}  </p>
        </div>
        <div class="flex gap-2"> 
             <button class="edit-btn text-blue-500 hover:text-blue-700 text-xl">✏️ </button>
             <button class="delete-btn text-red-500 hover:text-red-700 text-xl"> 🗑️ </button>
        </div>
        `;

    updateSummary(filtered); //pass filtered list

        // Add delete logic
        card.querySelector(".delete-btn").addEventListener("click", () =>{
            employees.splice(index, 1); //remove from array
            localStorage.setItem("employees", JSON.stringify(employees));

            renderEmployees(document.getElementById("searchInput").value); //re-render UI
        });

        // add Edit logic

        card.querySelector(".edit-btn").addEventListener("click", () =>{
            document.getElementById("name").value = emp.name;
            document.getElementById("position").value = emp.position;
            document.getElementById("department").value = emp.department;
            document.getElementById("salary").value = emp.salary.replace("₹", "");
            

            // remove the old one and allow re-submitting
            employees.splice(index, 1);
            localStorage.setItem("employees", JSON.stringify(employees)) //save update
            renderEmployees(document.getElementById("searchInput").value); //keep filtered value
        })
        employeeList.appendChild(card)
    });
}
