<template>
    <div class="field" :class="{ 'has-error': hasError }">
        <span>{{ control.caption }}</span>
        <div v-for="option in control.options" :key="option.value">
            <input
                type="radio"
                :id="`${control.id}-${option.value}`"
                v-model="formData[control.id]"
                :value="option.value"
                :required="control.required === 'true'"
            />
            <label :for="`${control.id}-${option.value}`">{{ option.label }}</label>
        </div>
    </div>
</template>

<script lang="ts">
import { FormControl } from '@/types/formInterfaces';
import Vue from 'vue';

export default Vue.extend({
    name: 'RadioField',
    props: {
        control: {
            type: Object as () => FormControl,
            required: true,
        },
        formData: {
            type: Object as any,
            required: true,
        },
        hasError: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style scoped>
.field {
    margin: 0.75rem 0 1.5rem 0;
    display: flex;
    flex-direction: column;
}

.field span {
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.field label {
    margin-left: 0.5rem;
}

.field.has-error label {
    color: #d9534f;
}
</style>