// Sample data for employees
const employees = [
  { name: 'Mohammed Shakawat Hossen', score: 80, department: 'Campus Ambassadors', id: '47257', status: 'Active', online: true, tasksCompleted: 10 },
  { name: 'Sadia Khan', score: 80, department: 'Campus Ambassadors', id: '77837', status: 'Active', online: true, tasksCompleted: 1 },
  { name: 'Jarin Tasnim mim', score: 300, department: 'Campus Ambassadors', id: '46041', status: 'Active', online: true, tasksCompleted: 1 },
  { name: 'Lamim Rahman', score: 40, department: 'Campus Ambassadors', id: '13706', status: 'Offline', online: false, tasksCompleted: 5 },
  { name: 'Sharmin Sultina Eite', score: 80, department: 'Campus Ambassadors', id: '11255', status: 'Active', online: false, tasksCompleted: 1 },
  { name: 'Fahim Faysal', score: 90, department: 'Campus Ambassadors', id: '84262', status: 'Offline', online: false, tasksCompleted: 7 },
  { name: 'MD FAHIM MORSHED', score: 90, department: 'Campus Ambassadors', id: '90759', status: 'Offline', online: false, tasksCompleted: 3 },
  { name: 'Nazneen Lipi', score: 290, department: 'Campus Ambassadors', id: '65432', status: 'Active', online: true, tasksCompleted: 6 },
  { name: 'Abir Borua', score: 90, department: 'Campus Ambassadors', id: '76543', status: 'Active', online: false, tasksCompleted: 4 },
];



// Function to populate the leaderboard
function populateLeaderboard(filteredEmployees) {
  const tableBody = document.querySelector('#leaderboard-table tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  filteredEmployees.sort((a, b) => b.score - a.score); // Sort by score in descending order

  filteredEmployees.slice(0, 5).forEach((employee, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td onclick="showProfile(${index})" style="cursor:pointer;">${employee.name}</td>
      <td>${employee.score}</td>
      <td><span class="${employee.online ? 'online' : 'offline'}">●</span></td>
      <td><a href="#">🔗 LinkedIn</a></td>
    `;
    tableBody.appendChild(row);
  });
  populateRewards(); // Update rewards dynamically
}

// Rewards section
function populateRewards() {
  const rewardList = document.getElementById('reward-list');
  rewardList.innerHTML = '';
  
  const topEmployees = employees.slice(0, 3); // Get top 3 employees
  const rewardData = [
    `🏅 Employee of the Month - ${topEmployees[0]?.name || 'N/A'}`,
    `🏆 Best Newcomer - ${topEmployees[1]?.name || 'N/A'}`,
    `🥇 Outstanding Performance - ${topEmployees[2]?.name || 'N/A'}`
  ];

  rewardData.forEach(reward => {
    const rewardDiv = document.createElement('div');
    rewardDiv.classList.add('reward');
    rewardDiv.textContent = reward;
    rewardList.appendChild(rewardDiv);
  });
}

// Search employee by name or ID
function searchEmployee() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchInput) || 
    employee.id.includes(searchInput)
  );
  
  populateLeaderboard(filteredEmployees);
}

// Show employee profile modal
function showProfile(index) {
  const employee = employees[index];
  document.getElementById('profile-name').textContent = employee.name;
  document.getElementById('profile-department').textContent = 'Department: ' + employee.department;
  document.getElementById('profile-id').textContent = 'ID: ' + employee.id;
  document.getElementById('profile-status').textContent = 'Status: ' + employee.status;
  document.getElementById('profile-score').textContent = employee.score;
  document.getElementById('profile-work-type').textContent = 'Full-time';  // Placeholder
  document.getElementById('profile-modal').style.display = 'flex';
}

// Close the profile modal
function closeProfile() {
  document.getElementById('profile-modal').style.display = 'none';
}

// Update live task status
function updateLiveTasks() {
  const liveTasksContainer = document.getElementById('live-tasks-container');
  liveTasksContainer.innerHTML = '';
  
  employees.forEach((employee) => {
    const taskProgress = Math.floor(Math.random() * 100);
    const onlineStatus = employee.online ? '<span class="online">● Online</span>' : '<span class="offline">● Offline</span>';
    const taskDiv = document.createElement('div');
    taskDiv.innerHTML = `${employee.name}: Task ${taskProgress}% completed ${onlineStatus}`;
    liveTasksContainer.appendChild(taskDiv);
  });
}

// Live graph
function renderGraph() {
  const ctx = document.getElementById('live-graph-container').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['IT', 'Marketing', 'HR', 'Finance', 'Operations'],
      datasets: [{
        label: 'Tasks Completed',
        data: employees.map(emp => emp.tasksCompleted),
        backgroundColor: 'rgba(30, 144, 255, 0.6)',
        borderColor: 'rgba(30, 144, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Initial function calls
populateLeaderboard(employees);
populateRewards();
updateLiveTasks();
renderGraph();
setInterval(updateLiveTasks, 5000);