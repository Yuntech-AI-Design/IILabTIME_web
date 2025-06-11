<template>
  <div class="bg-white border border-stone-300 rounded-lg p-6">
    <h2 class="text-xl font-semibold text-Ghibli-brown mb-6">實習單位資料</h2>

    <!-- 顯示模式 -->
    <transition
      enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
    >
      <div v-if="!isEditing" class="space-y-6 text-base">
        <div>
          <label class="text-sm font-medium text-stone-700">單位名稱</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.internshipCompany || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">公司地址</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.companyAddress || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">實習地址</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.internshipAddress || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">負責人</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.responsiblePerson || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">聯絡人</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.contactPerson || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">電話</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.contactPhone || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">統一編號</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.taxId || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">產業類型</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.industryType || '未提供' }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">實習期間</label>
          <p class="text-Ghibli-brown leading-relaxed">
            {{ internship.startDate && internship.endDate ? `${internship.startDate} 至 ${internship.endDate}` : '未提供' }}
          </p>
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">實習內容</label>
          <p class="text-Ghibli-brown leading-relaxed">{{ internship.internshipContent || '未提供' }}</p>
        </div>
        <button
          @click="isEditing = true"
          class="mt-6 w-full px-6 py-2 bg-Ghibli-blue text-white rounded-full text-sm font-semibold hover:bg-Ghibli-yellow transition-all duration-200"
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
          <label class="text-sm font-medium text-stone-700">單位名稱<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.internshipCompany"
            type="text"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">公司地址<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.companyAddress"
            type="text"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">實習地址<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.internshipAddress"
            type="text"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">負責人<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.responsiblePerson"
            type="text"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">聯絡人<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.contactPerson"
            type="text"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">電話<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.contactPhone"
            type="tel"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">統一編號<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.taxId"
            type="text"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">產業類型<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.industryType"
            type="text"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">實習開始日期<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.startDate"
            type="date"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">實習結束日期<span class="text-Ghibli-light-red">*</span></label>
          <input
            v-model="editableInternship.endDate"
            type="date"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base"
            required
          />
        </div>
        <div>
          <label class="text-sm font-medium text-stone-700">實習內容<span class="text-Ghibli-light-red">*</span></label>
          <textarea
            v-model="editableInternship.internshipContent"
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-Ghibli-blue text-base min-h-[100px]"
            required
          ></textarea>
        </div>
        <div class="flex space-x-2">
          <button
            type="submit"
            class="flex-1 px-6 py-2 bg-Ghibli-blue text-white rounded-full text-sm font-semibold hover:bg-Ghibli-yellow transition-all duration-200"
          >
            保存
          </button>
          <button
            @click="cancelEdit"
            type="button"
            class="flex-1 px-6 py-2 bg-Ghibli-red text-white rounded-full text-sm font-semibold hover:bg-Ghibli-yellow transition-all duration-200"
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