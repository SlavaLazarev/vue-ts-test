<template>
    <form class="form-container">
        <component
            v-for="control in sortedFormItems"
            :is="getComponentType(control)"
            v-model="formData[control.id]"
            :key="control.id"
            :control="control"
            :formData="formData"
            :hasError="validationErrors[control.id]"
            @customAction="handleCustomAction"
            @submit="handleSubmit"
            @reset="resetForm"
        />
    </form>
</template>

<script lang="ts">
import TextField from './TextField.vue';
import SelectField from './SelectField.vue';
import CheckboxField from './CheckboxField.vue';
import RadioField from './RadioField.vue';
import Label from './Label.vue';
import Button from './Button.vue';
import { FormJsonData, FormControl, ControlType } from '@/types/formInterfaces';
import Vue from 'vue';

export default Vue.extend({
    name: 'FormContainer',
    components: {
        TextField,
        Label,
        Button,
        SelectField,
        CheckboxField,
        RadioField,
    },
    props: {
        jsonFormData: {
            type: Object as () => FormJsonData,
            required: true,
        },
    },
    data () {
        const formControls: FormControl[] = this.jsonFormData.controls;

        return {
            formData: {} as Record<string, string>,
            validationErrors: {} as Record<string, boolean>,
            formControls: formControls,
        };
    },
    computed: {
        sortedFormItems (): any {
            return this.formControls
                .filter(control => this.shouldShowControl(control))
                .sort((a, b) => a.position - b.position);
        },
    },

    mounted () {
        document.title = this.jsonFormData.title || '';
        this.initializeFormData();
        this.initializeValidationErrors(this.formControls);
    },
    methods: {
        initializeFormData () {
            const formData: Record<string, string> = {};
            const savedData = localStorage.getItem('formData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                Object.keys(parsedData).forEach((key) => {
                    formData[key] = parsedData[key];
                });
            }
            this.formData = formData;
        },

        initializeValidationErrors (formControls: FormControl[]) {
            const validationErrors: Record<string, boolean> = {};
            formControls.forEach(control => {
                validationErrors[control.id] = false;
            });
            this.validationErrors = validationErrors;
        },

        getComponentType (control: FormControl) {
            switch (control.control) {
                case ControlType.TEXT:
                    return 'TextField';
                case ControlType.SELECT:
                    return 'SelectField';
                case ControlType.CHECKBOX:
                    return 'CheckboxField';
                case ControlType.RADIO:
                    return 'RadioField';
                case ControlType.LABEL:
                    return 'Label';
                case ControlType.BUTTON:
                    return 'Button';
                default:
                    return 'template';
            }
        },

        shouldShowControl (control: FormControl) {
            if (control.condition) {
                const dependencyValue = this.formData[control.condition.dependsOn];
                return control.condition.showIfSelected ? !!dependencyValue : !dependencyValue;
            }
            return true;
        },

        handleSubmit () {
            let isValid = true;
            this.formControls.forEach((control: FormControl) => {
                if (control.required === 'true' && !this.formData[control.id]) {
                    this.validationErrors[control.id] = true;
                    isValid = false;
                } else {
                    this.validationErrors[control.id] = false;
                }
            });

            if (isValid) {
                fetch(this.jsonFormData.submitUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.formData),
                })
                    .then((response) => {
                        // if (response.ok) {
                        if (1) {
                            console.log(this.formData);
                            localStorage.setItem('formData', JSON.stringify(this.formData));
                        } else {
                            alert('Ошибка при отправке формы');
                            console.debug('Error response:', response.status, response.statusText);
                        }
                    })
                    .catch((error) => {
                        alert('Ошибка при отправке формы');
                        console.debug('Fetch error:', error);
                    });
            }
        },

        resetForm () {
            Object.keys(this.formData).forEach((key: string) => (this.formData[key] = ''));
            Object.keys(this.validationErrors).forEach((key: string) => (this.validationErrors[key] = false));
            localStorage.removeItem('formData');
        },

        handleCustomAction (action: string) {
            console.debug(`Custom action triggered: ${action}`);
        },
    },
});
</script>

<style scoped>
.form-container {
    margin: 0 auto;
    max-width: 700px;
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    transition: box-shadow 0.3s, border-color 0.3s;
    text-align: left;
}

.form-container:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
</style>