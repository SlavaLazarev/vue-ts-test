<template>
    <div class="field" :class="{ 'has-error': hasError }">
        <input
            :id="control.id"
            :type="control.type || 'text'"
            :placeholder="control.caption"
            v-model="formData[control.id]"
            :required="control.required === 'true'"
        />
    </div>
</template>

<script lang="ts">
import { FormControl } from '@/types/formInterfaces';
import Vue from 'vue';

export default Vue.extend({
    name: 'TextField',
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

.field input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.field input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    background-color: #ffffff;
}

.field.has-error input {
    border-color: #d9534f;
    box-shadow: 0 0 5px rgba(217, 83, 79, 0.5);
}

.field.has-error label {
    color: #d9534f;
}
</style>