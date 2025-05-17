<template>
  <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-6">實習單位資料</h2>

    <!-- 顯示模式 -->
    <transition
      enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
    >
      <div v-if="!isEditing" class="space-y-6 text-base">
        <div>
          <label class="text-sm font-medium text-gray-600">單位名稱</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.internshipCompany || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">公司地址</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.companyAddress || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">實習地址</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.internshipAddress || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">負責人</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.responsiblePerson || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">聯絡人</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.contactPerson || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">電話</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.contactPhone || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">統一編號</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.taxId || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">產業類型</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.industryType || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">實習期間</label>
          <p class="text-gray-800 leading-relaxed">
            {{ internship.startDate && internship.endDate ? `${internship.startDate} 至 ${internship.endDate}` : '未提供' }}
          </p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">實習內容</label>
          <p class="text-gray-800 leading-relaxed">{{ internship.internshipContent || '未提供' }}</p>
        </div>
        <button
          @click="isEditing = true"
          class="mt-6 w-full px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-200"
        >
          編輯實習資料
        </button>
      </div>
    </transition>

    <!-- 編輯模式 -->
    <transition
      enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
    >
      <form v-if="isEditing" @submit.prevent="saveInternship" class="space-y-6 text-base">
        <div>
          <label class="text-sm font-medium text-gray-600">單位名稱</label>
          <input
            v-model="editableInternship.internshipCompany"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">公司地址</label>
          <input
            v-model="editableInternship.companyAddress"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">實習地址</label>
          <input
            v-model="editableInternship.internshipAddress"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">負責人</label>
          <input
            v-model="editableInternship.responsiblePerson"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">聯絡人</label>
          <input
            v-model="editableInternship.contactPerson"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">電話</label>
          <input
            v-model="editableInternship.contactPhone"
            type="tel"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">統一編號</label>
          <input
            v-model="editableInternship.taxId"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">產業類型</label>
          <input
            v-model="editableInternship.industryType"
            type="text"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">實習開始日期</label>
          <input
            v-model="editableInternship.startDate"
            type="date"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">實習結束日期</label>
          <input
            v-model="editableInternship.endDate"
            type="date"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">實習內容</label>
          <textarea
            v-model="editableInternship.internshipContent"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[100px]"
            required
          ></textarea>
        </div>
        <div class="flex space-x-2">
          <button
            type="submit"
            class="flex-1 px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-200"
          >
            保存
          </button>
          <button
            @click="cancelEdit"
            type="button"
            class="flex-1 px-4 py-1.5 bg-gray-300 text-gray-800 rounded-full text-sm font-semibold hover:bg-gray-400 transition-all duration-200"
          >
            取消
          </button>
        </div>
      </form>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
  internship: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:internship', 'show-success']);

const isEditing = ref(false);
const editableInternship = reactive({ ...props.internship });

// 監聽父組件的 internship 變化，同步到 editableInternship
watch(() => props.internship, (newInternship) => {
  Object.assign(editableInternship, newInternship);
});

const saveInternship = () => {
  emit('update:internship', { ...editableInternship });
  emit('show-success');
  isEditing.value = false;
};

const cancelEdit = () => {
  Object.assign(editableInternship, props.internship);
  isEditing.value = false;
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}

.animate-fade-out {
  animation: fade-out 0.3s ease-in-out;
}
</style>