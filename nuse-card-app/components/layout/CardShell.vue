<template>
  <div class="page-shell">
    <div class="page-shell__content">
      <BackgroundDecor />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background: linear-gradient(160deg, #fef3e8 0%, #f7f2e8 35%, #eaf1fb 70%, #f7f2e8 100%);
  background-image: radial-gradient(rgba(18, 24, 74, 0.06) 1px, transparent 1.4px),
    linear-gradient(160deg, #fef3e8 0%, #f7f2e8 35%, #eaf1fb 70%, #f7f2e8 100%);
  background-size: 14px 14px, 100% 100%;
}

.page-shell__content {
  position: relative;
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .page-shell {
    padding: 56px 16px;
  }
}
</style>
