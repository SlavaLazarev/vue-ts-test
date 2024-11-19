export enum ControlType {
    FORM = 'FORM',
    TEXT = 'TEXT',
    LABEL = 'LABEL',
    BUTTON = 'BUTTON',
    SELECT = 'SELECT',
    CHECKBOX = 'CHECKBOX',
    RADIO = 'RADIO',
}

export interface ControlCondition {
    dependsOn: string;
    showIfSelected: boolean;
}

export interface FormControl {
    id: string;
    control: ControlType;
    caption: string;
    parentID?: string;
    tabIndex: number;
    position: number;
    type?: string;
    required?: 'true' | 'false';
    action?: string;
    children?: Array<FormControl>;
    options?: Array<{ value: string; label: string }>;
    condition?: ControlCondition;
}

export interface FormJsonData {
    title: string;
    controls: Array<FormControl>;
    submitUrl: string;
}