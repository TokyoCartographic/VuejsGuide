<template>
  <dialog open>
    <h1>
      <!-- ここにタイトルを表示 -->
      <slot name="title" />
    </h1>
    <div>
      <!-- ここにダイアログの内容を表示 -->
      <slot />
    </div>
  </dialog>
</template>
