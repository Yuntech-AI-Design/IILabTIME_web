<template>
  <div class="mb-6">
    <h3 class="text-xl font-semibold text-gray-700 mb-4">實習週報表格</h3>
    <div class="overflow-x-auto">
      <table v-if="reports.length" class="min-w-full border border-gray-300 shadow-sm rounded-lg">
        <thead class="bg-gray-200">
          <tr class="text-gray-700">
            <th class="px-4 py-2 border-b">週次</th>
            <th class="px-4 py-2 border-b">日期</th>
            <th class="px-4 py-2 border-b">時數</th>
            <th class="px-4 py-2 border-b">工作內容</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="report in reports"
            :key="report.week"
            class="text-center text-sm even:bg-gray-50"
          >
            <td class="px-4 py-2 border-b">{{ report.week ?? '未知' }}</td>
            <td class="px-4 py-2 border-b">{{ report.date ?? '未知' }}</td>
            <td class="px-4 py-2 border-b">{{ report.hours ?? 0 }}</td>
            <td class="px-4 py-2 border-b text-left whitespace-pre-wrap break-words">
              {{ report.content?.trim() || '未提供' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-gray-500 text-sm text-center py-4">
        尚未上傳任何實習週報。
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reports: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>