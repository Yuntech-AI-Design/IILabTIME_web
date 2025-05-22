/** @type {import('tailwindcss').Config} */
const colors = {
  'Ghibli-blue': '#6C96A3',   // 邊框、日期分隔符
  'Ghibli-green': '#86A579',  // 提示文字
  'Ghibli-light-red': '#E45C5F', // 必填星號
  'Ghibli-red': '#B73239',    // 次要元素（例如按鈕）
  'Ghibli-yellow': '#EDB422', // 聚焦效果
  'Ghibli-brown': '#64544C',  // 主要文字
  'Ghibli-skin': '#E4B584',   // 卡片背景
};

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // 掃描所有 Vue 和 JS/TS 檔案
  ],
  darkMode: false, // 可改為 'media' 或 'class' 若需要暗黑模式
  theme: {
    extend: {
      colors: colors, // 自定義顏色
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow-absolute': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(1.05)',
            opacity: '1',
          },
        },
        'pulse-slow-relative': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(1.05)',
            opacity: '1',
          },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -30%)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%, -50%)',
          },
        },
        fadeInUpRelative: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -30%)',
          },
          to: {
            opacity: '1',
            transform: 'translate(0%, 0%)',
          },
        },
        fadeInLeft: {
          from: { opacity: '0', transform: 'translateX(-50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          from: { opacity: '0', transform: 'translateX(50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delay-1': 'float 7s ease-in-out infinite 0.5s',
        'float-delay-2': 'float 8s ease-in-out infinite 1s',
        'float-delay-3': 'float 6.5s ease-in-out infinite 1.5s',
        'float-delay-4': 'float 7.5s ease-in-out infinite 2s',
        'pulse-slow': 'pulse-slow-absolute 8s ease-in-out infinite', // 修正為 pulse-slow-absolute
        'fade-in-up-absolute': 'fadeInUp 1.5s ease-out forwards',
        'fade-in-up-relative': 'fadeInUpRelative 1.5s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        blink: 'blink 1s step-start infinite',
      },
      fontFamily: {
        ZMG: ['RawMarukoGothicCJKtc-Regular', 'sans-serif'], // 添加備用字體
      },
    },
  },
  plugins: [], // 可根據需要添加插件，例如 typography 或 forms
};