<template>
    <div class="field" :class="{ 'has-error': hasError }">
        <select
            :id="control.id"
            v-model="formData[control.id]"
            :required="control.required === 'true'"
        >
            <option v-for="option in control.options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { FormControl } from '@/types/formInterfaces';
import Vue from 'vue';

export default Vue.extend({
    name: 'SelectField',
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

.field select {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.field select:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.field.has-error select {
    border-color: #d9534f;
    box-shadow: 0 0 5px rgba(217, 83, 79, 0.5);
}
</style>