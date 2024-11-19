<template>
    <div id="app">
        <FormContainer :jsonFormData="formJsonData"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FormContainer from './components/FormContainer.vue';

const formJsonData = {
    title: 'Открыть договор',
    controls: [
        {
            id: '5927943491',
            control: 'FORM',
            caption: 'Открыть договор',
            parentID: '',
            tabIndex: 0,
            position: 0,
        },
        {
            id: '5927943492',
            control: 'TEXT',
            caption: 'Кредит',
            parentID: '5927943491',
            tabIndex: 1,
            position: 2,
            type: 'text',
            required: 'true',
        },
        {
            id: '5927943493',
            control: 'BUTTON',
            caption: 'OK',
            parentID: '5927943491',
            tabIndex: 13,
            position: 13,
            type: 'button',
        },
        {
            id: '5927943494',
            control: 'BUTTON',
            caption: 'Отмена',
            parentID: '5927943491',
            tabIndex: 14,
            position: 14,
            type: 'button',
        },
        {
            id: '5927943495',
            control: 'LABEL',
            caption: 'Вид кредита1',
            parentID: '5927943492',
            tabIndex: -1,
            position: 1,
            type: 'label',
        },
        {
            id: '5927943496',
            control: 'TEXT',
            caption: 'Финансовый продукт',
            parentID: '5927943491',
            tabIndex: 6,
            position: 3,
            required: 'true',
            type: 'text',
        },
        {
            id: '5927943497',
            control: 'TEXT',
            caption: 'Нефинансовый продукт',
            parentID: '5927943491',
            tabIndex: 7,
            position: 4,
            required: 'false',
            type: 'text',
        },
        // Первый селектор:
        {
            id: '5927943498',
            control: 'SELECT',
            caption: 'Тип кредита',
            parentID: '5927943491',
            tabIndex: 8,
            position: 5,
            required: 'true',
            type: 'select',
            options: [
                { value: 'consumer', label: 'Потребительский' },
                { value: 'mortgage', label: 'Ипотечный' },
                { value: 'auto', label: 'Автокредит' },
            ],
        },
        {
            id: '5927943499',
            control: 'CHECKBOX',
            caption: 'Согласие на обработку данных',
            parentID: '5927943491',
            tabIndex: 9,
            position: 6,
            required: 'true',
            type: 'checkbox',
        },
        {
            id: '5927943500',
            control: 'RADIO',
            caption: 'Выберите способ оплаты',
            parentID: '5927943491',
            tabIndex: 10,
            position: 7,
            required: 'true',
            type: 'radio',
            options: [
                { value: 'monthly', label: 'Ежемесячно' },
                { value: 'annually', label: 'Ежегодно' },
            ],
        },
        // Второй селектор, который отображается только при выборе в первом селекторе:
        {
            id: '5927943501',
            control: 'SELECT',
            caption: 'Выберите категорию кредита',
            parentID: '5927943491',
            tabIndex: 11,
            position: 8,
            required: 'false',
            type: 'select',
            condition: {
                dependsOn: '5927943498',
                showIfSelected: true,
            },
            options: [
                { value: 'category1', label: 'Категория 1' },
                { value: 'category2', label: 'Категория 2' },
                { value: 'category3', label: 'Категория 3' },
            ],
        },
    ],
    submitUrl: '/api/submitForm',
};


export default Vue.extend({
    name: 'App',
    components: {
        FormContainer,
    },
    data () {
        return {
            formJsonData,
        };
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>