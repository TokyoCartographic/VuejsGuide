<template>
  <h1>Message</h1>
  <slot v-bind:foo="'Hello World'" />
  <!--
  <slot :foo="'Hello World'" :bar="'こんにちは！'" />
  -->
</template>
