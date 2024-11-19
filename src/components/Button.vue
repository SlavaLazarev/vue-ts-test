<template>
    <button
        :type="control.type || 'button'"
        @click="handleClick"
        class="button"
    >
        {{ control.caption }}
    </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { FormControl } from '@/types/formInterfaces';

export default Vue.extend({
    name: 'Button',
    props: {
        control: {
            type: Object as () => FormControl,
            required: true,
        },
    },
    methods: {
        handleClick () {
            // if (this.control.action === 'submit') {
            if (this.control.caption === 'OK') {
                this.$emit('submit');
                // } else if (this.control.action === 'reset') {
            } else if (this.control.caption === 'Отмена') {
                this.$emit('reset');
            } else {
                this.$emit('customAction', this.control.caption);
            }
        },
    },
});
</script>

<style scoped>
.button {
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-right: 1rem;
}

.button:last-child {
    margin-right: 0;
}

.button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.button:active {
    transform: translateY(0);
}

.button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    box-shadow: none;
}
</style>