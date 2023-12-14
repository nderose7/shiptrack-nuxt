<template>
  <div class="field">
    <div class="label is-normal">
      <label class="label font-bold">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control has-icons-left has-icons-right relative">
          <VField :name="name" v-slot="{ field, errors }" class="">
            <input
              v-bind="field"
              class="input rounded-md border"
              
              :id="id"
              :placeholder="placeholder"
              :type="type"
              :value="modelValue"
              @input="$emit('update:modelValue', $event.target.value)"
            />

            <VErrorMessage
              :name="name"
              as="div"
              class="help is-danger mt-1 text-base"
            />
            <div class="debug" v-if="debug">
              <pre>{{ errors }}</pre>
              <pre>{{ meta }}</pre>
            </div>
          </VField>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  ["modelValue"]: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  leftIcon: {
    type: String,
    default: "",
  },
  rightIcon: {
    type: String,
    default: "",
  },
  debug: {
    type: Boolean,
    default: false,
  },
  refName: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.icon {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 11px;
  fill: black;
}
.is-left {
  left: 12px;
}
.is-right {
  right: 6px;
}
.icon svg {
  color: #94a3b8;
}

input[type="password"] {
  font-family: Verdana;
}
input[type="password"]::placeholder {
  font-family: "Urbanist";
  font-size: 20px;
  letter-spacing: 0.05rem;
}
input[type="email"]::placeholder {
  font-family: "Urbanist";
  font-size: 20px;
  letter-spacing: 0.05rem;
}
</style>
