const form = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");

const employees =[];

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
    form.reset();
    renderEmployees();
})

function renderEmployees() {
    employeeList.innerHTML = "";

    employees.forEach(emp => {
        const card = document.createElement("div");

        card.className = "bg-white p-4 rounded-xl shadow hover:shadow-lg transition border-l-4 border-gray-500";
        card.innerHTML = `
        <h2 class="text-xl font-semibold"> ${emp.name} </h2>
        <p class="text-gray-600"> ${emp.position} - ${emp.department} </p>
        <p class="text-green-600 font-bold"> ${emp.salary}  </p> `;

        employeeList.appendChild(card)
    });
}
