<template>
<svg viewBox="0 0 150 30" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: #ffffff; stop-opacity: 1" />
      <stop offset="100%" style="stop-color: #ffffff; stop-opacity: 0.2" />
    </linearGradient>
    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: #90ee90; stop-opacity: 0.5" />
      <stop offset="100%" style="stop-color: #90ee90; stop-opacity: 0.2" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="150" height="30" fill="url(#gradient)" />
  <path d="M 0 20 L 25 18 L 50 23 L 75 20 L 100 24 L 125 18 L 150 15" stroke="green" stroke-width="1" fill="none" />
  <path d="M 0 20 L 25 18 L 50 23 L 75 20 L 100 24 L 125 18 L 150 15 L 150 30 L 0 30 Z" fill="url(#areaGradient)" />
</svg>

</template>