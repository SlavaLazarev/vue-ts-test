<template>
    <label :for="control.id" class="label">{{ control.caption }}</label>
</template>

<script lang="ts">
import Vue from 'vue';
import { FormControl } from '@/types/formInterfaces';

export default Vue.extend({
    name: 'Label',
    props: {
        control: {
            type: Object as () => FormControl,
            required: true,
        },
    },
});
</script>

<style scoped>
.label {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    align-items: start;
}
</style>