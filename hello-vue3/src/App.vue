<template>
  <div>
    <div class="header text-center">
      <h1><i class="fas fa-laptop-code"></i> 資訊整合實驗室</h1>
      <p class="mb-0">實習時間追蹤系統</p>
    </div>

    <div class="container my-4">
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="alert alert-info" role="alert">
            <i class="fas fa-info-circle"></i> 打卡開始計時會使用系統時間，無法手動竄改。競爭排行榜每週更新！
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0"><i class="fas fa-user-clock"></i> 個人狀態</h5>
            </div>
            <div class="card-body text-center">
              <div class="mb-3">
                <select v-model="selectedUser" class="form-select mb-3" @change="updateUser">
                  <option disabled value="">選擇使用者</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
                <h4>{{ currentUserName || '請選擇使用者' }}</h4>
                <p class="mb-2">目前狀態: <span v-html="userStatus"></span></p>
              </div>

              <div class="mb-4">
                <h5>本次時間</h5>
                <div class="timer">{{ currentTimer }}</div>
              </div>

              <div class="mb-3">
                <h5>本週累計</h5>
                <div class="timer">{{ weeklyTimer }}</div>
              </div>

              <button @click="checkIn" :disabled="!selectedUser || isOnline" class="btn btn-success mb-2">
                <i class="fas fa-sign-in-alt"></i> 打卡上線
              </button>
              <button @click="checkOut" :disabled="!isOnline" class="btn btn-danger">
                <i class="fas fa-sign-out-alt"></i> 打卡下線
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-header bg-warning text-dark">
              <h5><i class="fas fa-trophy"></i> 本週排行榜</h5>
            </div>
            <div class="card-body">
              <ul>
                <li v-for="(user, index) in leaderboard" :key="index">
                  {{ user.name }} - {{ user.time }}
                </li>
              </ul>
            </div>
          </div>

          <div class="card mt-3">
            <div class="card-header bg-success text-white">
              <h5><i class="fas fa-users"></i> 目前在線成員</h5>
            </div>
            <div class="card-body">
              <ul>
                <li v-for="user in onlineUsers" :key="user.id">
                  {{ user.name }}
                </li>
                <li v-if="onlineUsers.length === 0">目前無人在線</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedUser: '',
      currentUserName: '',
      users: [
        { id: 'user1', name: '郭秉乾' },
        { id: 'user2', name: '王豆腐' },
        { id: 'user3', name: '蔡鈞凱' },
        { id: 'user4', name: '胡宇倫比' },
        { id: 'user5', name: '李琛昱' }
      ],
      leaderboard: [],
      onlineUsers: [],
      isOnline: false,
      userStatus: '<span class="online-status offline"></span> 離線',
      currentTimer: '00:00:00',
      weeklyTimer: '00:00:00'
    };
  },
  methods: {
    updateUser() {
      this.currentUserName = this.users.find(user => user.id === this.selectedUser).name;
    },
    checkIn() {
      this.isOnline = true;
      this.userStatus = '<span class="online-status online"></span> 在線';
    },
    checkOut() {
      this.isOnline = false;
      this.userStatus = '<span class="online-status offline"></span> 離線';
    }
  }
};
</script>

