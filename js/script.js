// 儲存所有用戶資料的物件
const users = {
    user1: { 
        name: "郭秉乾", 
        isOnline: false, 
        currentSessionStart: null,
        currentSessionTime: 0,
        weeklyTime: 7200, // 示範用，預設2小時
        logs: [
            { type: "in", time: new Date(new Date().setHours(new Date().getHours() - 26)), duration: null },
            { type: "out", time: new Date(new Date().setHours(new Date().getHours() - 24)), duration: 7200 }
        ]
    },
    user2: { 
        name: "王豆腐", 
        isOnline: false, 
        currentSessionStart: null,
        currentSessionTime: 0,
        weeklyTime: 10800, // 3小時
        logs: [
            { type: "in", time: new Date(new Date().setHours(new Date().getHours() - 27)), duration: null },
            { type: "out", time: new Date(new Date().setHours(new Date().getHours() - 24)), duration: 10800 }
        ]
    },
    user3: { 
        name: "蔡鈞凱", 
        isOnline: false, 
        currentSessionStart: null,
        currentSessionTime: 0,
        weeklyTime: 14400, // 4小時
        logs: [
            { type: "in", time: new Date(new Date().setHours(new Date().getHours() - 30)), duration: null },
            { type: "out", time: new Date(new Date().setHours(new Date().getHours() - 26)), duration: 14400 }
        ]
    },
    user4: { 
        name: "胡宇倫比", 
        isOnline: false, 
        currentSessionStart: null,
        currentSessionTime: 0,
        weeklyTime: 5400, // 1.5小時
        logs: [
            { type: "in", time: new Date(new Date().setHours(new Date().getHours() - 28)), duration: null },
            { type: "out", time: new Date(new Date().setHours(new Date().getHours() - 27)), duration: 5400 }
        ]
    },
    user5: { 
        name: "李琛昱", 
        isOnline: false, 
        currentSessionStart: null,
        currentSessionTime: 0,
        weeklyTime: 18000, // 5小時
        logs: [
            { type: "in", time: new Date(new Date().setHours(new Date().getHours() - 20)), duration: null },
            { type: "out", time: new Date(new Date().setHours(new Date().getHours() - 15)), duration: 18000 }
        ]
    }
};

// DOM 元素
const userSelector = document.getElementById('user-selector');
const currentUserElement = document.getElementById('current-user');
const statusIndicator = document.getElementById('status-indicator');
const checkInBtn = document.getElementById('check-in-btn');
const checkOutBtn = document.getElementById('check-out-btn');
const currentTimer = document.getElementById('current-timer');
const weeklyTimer = document.getElementById('weekly-timer');
const leaderboardList = document.getElementById('leaderboard-list');
const onlineUsersList = document.getElementById('online-users-list');
const historyLog = document.getElementById('history-log');

let currentUser = null;
let timerInterval = null;

// 格式化時間為 HH:MM:SS
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// 格式化日期時間
function formatDateTime(date) {
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    };
    return new Intl.DateTimeFormat('zh-TW', options).format(date);
}

// 啟動計時器
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (currentUser && users[currentUser].isOnline) {
            const now = new Date();
            const start = users[currentUser].currentSessionStart;
            const sessionSeconds = Math.floor((now - start) / 1000);
            
            users[currentUser].currentSessionTime = sessionSeconds;
            currentTimer.textContent = formatTime(sessionSeconds);
        }
    }, 1000);
}

// 停止計時器
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// 更新使用者狀態
function updateUserStatus() {
    if (!currentUser) return;
    
    const user = users[currentUser];
    
    // 更新狀態指示器
    statusIndicator.innerHTML = user.isOnline 
        ? '<span class="online-status online"></span>在線' 
        : '<span class="online-status offline"></span>離線';
    
    // 啟用/停用按鈕
    checkInBtn.disabled = user.isOnline;
    checkOutBtn.disabled = !user.isOnline;
    
    // 更新計時器顯示
    currentTimer.textContent = formatTime(user.currentSessionTime);
    weeklyTimer.textContent = formatTime(user.weeklyTime);
    
    // 如果在線，啟動計時器；否則停止計時器
    if (user.isOnline) {
        startTimer();
    } else {
        stopTimer();
    }
}

// 更新排行榜
function updateLeaderboard() {
    // 依照每週時間排序
    const sortedUsers = Object.entries(users)
        .map(([id, user]) => ({ id, ...user }))
        .sort((a, b) => b.weeklyTime - a.weeklyTime);
    
    leaderboardList.innerHTML = '';
    
    sortedUsers.forEach((user, index) => {
        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center ${rankClass}`;
        
        const nameSpan = document.createElement('span');
        nameSpan.innerHTML = `<strong>${index + 1}.</strong> ${user.name}`;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'badge bg-primary rounded-pill';
        timeSpan.textContent = formatTime(user.weeklyTime);
        
        li.appendChild(nameSpan);
        li.appendChild(timeSpan);
        leaderboardList.appendChild(li);
    });
}

// 更新在線使用者列表
function updateOnlineUsers() {
    const onlineUsers = Object.entries(users)
        .filter(([_, user]) => user.isOnline)
        .map(([id, user]) => ({ id, ...user }));
    
    onlineUsersList.innerHTML = '';
    
    if (onlineUsers.length === 0) {
        const li = document.createElement('li');
        li.className = 'list-group-item text-center text-muted';
        li.textContent = '目前無人在線';
        onlineUsersList.appendChild(li);
        return;
    }
    
    onlineUsers.forEach(user => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const nameDiv = document.createElement('div');
        nameDiv.innerHTML = `
            <span class="online-status online"></span>
            ${user.name}
        `;
        
        const timeDiv = document.createElement('div');
        const startTime = formatDateTime(user.currentSessionStart);
        timeDiv.innerHTML = `<small>上線時間: ${startTime}</small>`;
        
        li.appendChild(nameDiv);
        li.appendChild(timeDiv);
        onlineUsersList.appendChild(li);
    });
}

// 更新歷史記錄
function updateHistoryLog() {
    if (!currentUser) return;
    
    const user = users[currentUser];
    historyLog.innerHTML = '';
    
    if (user.logs.length === 0) {
        historyLog.innerHTML = '<div class="text-center text-muted"><p>無歷史記錄</p></div>';
        return;
    }
    
    // 反向顯示日誌（最新的在上方）
    const reversedLogs = [...user.logs].reverse();
    
    reversedLogs.forEach(log => {
        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        
        const time = formatDateTime(log.time);
        let content = '';
        
        if (log.type === 'in') {
            content = `<i class="fas fa-sign-in-alt text-success"></i> <strong>打卡上線</strong>`;
        } else {
            content = `<i class="fas fa-sign-out-alt text-danger"></i> <strong>打卡下線</strong>`;
            if (log.duration) {
                content += ` <small>(時長: ${formatTime(log.duration)})</small>`;
            }
        }
        
        logItem.innerHTML = `
            ${content}
            <div class="log-time">${time}</div>
        `;
        
        historyLog.appendChild(logItem);
    });
}

// 初始化活動圖表
function initActivityChart() {
    const ctx = document.getElementById('activity-chart').getContext('2d');
    
    // 獲取所有用戶名稱
    const userNames = Object.values(users).map(user => user.name);
    
    // 獲取所有用戶的每週時間（小時）
    const weeklyHours = Object.values(users).map(user => user.weeklyTime / 3600);
    
    // 顏色陣列
    const backgroundColors = [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)'
    ];
    
    const borderColors = [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)'
    ];
    
    const activityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: userNames,
            datasets: [{
                label: '本週實習時數 (小時)',
                data: weeklyHours,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '時數 (小時)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '學生'
                    }
                }
            }
        }
    });
}

// 顯示警告提示
function showWarning(message) {
    // 創建警告元素
    const warningDiv = document.createElement('div');
    warningDiv.className = 'alert alert-warning alert-dismissible fade show';
    warningDiv.setAttribute('role', 'alert');
    warningDiv.innerHTML = `
        <strong>警告!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // 將警告插入頁面頂部
    const container = document.querySelector('.container');
    container.insertBefore(warningDiv, container.firstChild);
    
    // // 5秒後自動消失
    // setTimeout(() => {
    //     warningDiv.classList.remove('show');
    //     setTimeout(() => {
    //         warningDiv.remove();
    //     }, 150);
    // }, 5000);
}

// 打卡上線
function checkIn() {
    if (!currentUser || users[currentUser].isOnline) return;
    
    const user = users[currentUser];
    const now = new Date();
    
    user.isOnline = true;
    user.currentSessionStart = now;
    user.currentSessionTime = 0;
    
    // 添加日誌
    user.logs.push({
        type: 'in',
        time: now,
        duration: null
    });
    
    updateUserStatus();
    updateOnlineUsers();
    updateHistoryLog();
}

// 打卡下線
function checkOut() {
    if (!currentUser || !users[currentUser].isOnline) return;
    
    const user = users[currentUser];
    const now = new Date();
    
    // 計算本次時長（秒）
    const sessionDuration = Math.floor((now - user.currentSessionStart) / 1000);
    
    // 計算本週總時長（當前累計 + 本次時長）
    const totalWeeklyTime = user.weeklyTime + sessionDuration;
    const sixHoursInSeconds = 6 * 60 * 60; // 6小時轉換為秒
    
    // 檢查本週累計時間是否少於6小時
    if (totalWeeklyTime < sixHoursInSeconds) {
        // 顯示確認對話框
        const confirmCheckout = confirm(`警告: 本週累計時間不足6小時（目前: ${formatTime(totalWeeklyTime)}）。確定要打卡下線嗎？`);
        if (!confirmCheckout) {
            return; // 用戶取消了打卡
        }
        
        // 顯示警告提示
        showWarning(`本週累計時間不足6小時（${formatTime(totalWeeklyTime)}）。本週實習時間至少應達6小時。`);
    }
    
    user.isOnline = false;
    
    // 更新本週累計時間
    user.weeklyTime += sessionDuration;
    
    // 添加日誌
    user.logs.push({
        type: 'out',
        time: now,
        duration: sessionDuration
    });
    
    user.currentSessionStart = null;
    
    updateUserStatus();
    updateOnlineUsers();
    updateHistoryLog();
    updateLeaderboard();
    
    // 更新圖表（簡單方式是重新初始化）
    initActivityChart();
}

// 選擇使用者變更事件
userSelector.addEventListener('change', function() {
    currentUser = this.value;
    currentUserElement.textContent = users[currentUser]?.name || '請選擇使用者';
    
    updateUserStatus();
    updateHistoryLog();
});

// 打卡按鈕事件
checkInBtn.addEventListener('click', checkIn);
checkOutBtn.addEventListener('click', checkOut);

// 初始化
function init() {
    updateLeaderboard();
    updateOnlineUsers();
    initActivityChart();
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', init);