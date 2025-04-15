const colors = {
  'Ghibli-blue': '#6C96A3',
  'Ghibli-green': '#86A579',
  'Ghibli-light-red': '#E45C5F',
  'Ghibli-red': '#B73239',
  'Ghibli-yellow': '#EDB422',
  'Ghibli-brown': '#64544C',
  'Ghibli-skin': '#E4B584',
}

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow-absolute': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '0.8'
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(1.05)',
            opacity: '1'
          },
        },
        'pulse-slow-relative': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '0.8'
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(1.05)',
            opacity: '1'
          },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translate(-50%, -30%)'
          },
          'to': {
            opacity: '1',
            transform: 'translate(-50%, -50%)'
          },
        },
        fadeInUpRelative:{
          'from': {
            opacity: '0',
            transform: 'translate(-50%, -30%)'
          },
          'to': {
            opacity: '1',
            transform: 'translate(0%, 0%)'
          },
        },
        fadeInLeft: {
          'from': { opacity: '0', transform: 'translateX(-50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          'from': { opacity: '0', transform: 'translateX(50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay-1': 'float 7s ease-in-out infinite 0.5s',
        'float-delay-2': 'float 8s ease-in-out infinite 1s',
        'float-delay-3': 'float 6.5s ease-in-out infinite 1.5s',
        'float-delay-4': 'float 7.5s ease-in-out infinite 2s',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'fade-in-up-absolute': 'fadeInUp 1.5s ease-out forwards',
        'fade-in-up-relative': 'fadeInUpRelative 1.5s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'blink': 'blink 1s step-start infinite',
      },
      fontFamily: { "ZMG": ["RawMarukoGothicCJKtc-Regular"] },
      
      colors: colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}