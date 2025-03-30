<template>
    <div id="menuToggle">
        <input id="checkbox" type="checkbox" v-model="proxyChecked">
        <label class="toggle" for="checkbox">
            <div class="bar bar--top"></div>
            <div class="bar bar--middle"></div>
            <div class="bar bar--bottom"></div>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue"

defineOptions({
  name: "ShowButton"
})

const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {  }
)
const { modelValue } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

// Criamos um "proxy" para v-model
const proxyChecked = computed<boolean>({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})
</script>

<style scoped>
/* From Uiverse.io by vk-uiux */ 
#checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: 24px;
  cursor: pointer;
  margin: auto;
  display: block;
  height: calc(1px * 3 + 11px * 2);
}

.bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  border-radius: calc(4px / 2);
  background: white;
  color: inherit;
  opacity: 1;
  transition: none 0.35s cubic-bezier(.5,-0.35,.35,1.5) 0s;
}

/***** Tornado Animation *****/

.bar--top {
  bottom: calc(50% + 9px - 1px/ 2);
  transition-property: bottom,transform;
  transition-delay: calc(0s + 0.35s) * .6;
}

.bar--middle {
  top: calc(50% - 3px/ 2);
  transition-property: opacity,transform;
  transition-delay: calc(0s + 0.35s * .3);
}

.bar--bottom {
  top: calc(50% + 9px - 1px/ 2);
  transition-property: top,transform;
  transition-delay: 0s;
}

#checkbox:checked + .toggle .bar--top {
  transform: rotate(-135deg);
  transition-delay: 0s;
  bottom: calc(50% - 2px/ 2);
}

#checkbox:checked + .toggle .bar--middle {
  opacity: 0;
  transform: rotate(-135deg);
  transition-delay: calc(0s + 0.35s * .3);
}

#checkbox:checked + .toggle .bar--bottom {
  top: calc(50% - 2px/ 2);
  transform: rotate(-225deg);
  transition-delay: calc(0s + 0.35s * .6);
}
</style>