<template>
  Composition APIで作成したコンポーネント:<br>
  <CompositionApiComponent />
  <br><br><br>
  Options APIで作成したコンポーネント:<br>
  <OptionsApiComponent/>
</template>
<script>
import CompositionApiComponent from "./components/CompositionApiComponent.vue"
import OptionsApiComponent from "./components/OptionsApiComponent.vue"

export default {
  name: "App",
  components: {
    CompositionApiComponent,
    OptionsApiComponent
  }
}
</script>
