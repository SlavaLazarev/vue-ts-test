<template>
    <div class="field" :class="{ 'has-error': hasError }">
        <label :for="control.id" class="checkbox-label">
            <input
                :id="control.id"
                type="checkbox"
                v-model="formData[control.id]"
                :required="control.required === 'true'"
            />
            {{ control.caption }}
        </label>
    </div>
</template>

<script lang="ts">
import { FormControl } from '@/types/formInterfaces';
import Vue from 'vue';

export default Vue.extend({
    name: 'CheckboxField',
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

.checkbox-label {
    display: flex;
    align-items: center;
    font-size: 1rem;
}

.checkbox-label input {
    margin-right: 0.5rem;
}

.field.has-error .checkbox-label {
    color: #d9534f;
}
</style>