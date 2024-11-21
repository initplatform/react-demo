import type { WidgetColumn, WidgetOperator, WidgetOperatorMap } from '@/types/chip-widget';
import { WidgetOperatorName } from '@/types/chip-widget';

export const widgetOperatorMap: WidgetOperatorMap = {
    [WidgetOperatorName.contains]: {
        name: WidgetOperatorName.contains,
        displayString: 'contains',
    },
    [WidgetOperatorName.equals]: {
        name: WidgetOperatorName.equals,
        displayString: '=',
    },
    [WidgetOperatorName.greaterThan]: {
        name: WidgetOperatorName.greaterThan,
        displayString: '>',
    },
    [WidgetOperatorName.lessThan]: {
        name: WidgetOperatorName.lessThan,
        displayString: '<',
    },
    [WidgetOperatorName.notEquals]: {
        name: WidgetOperatorName.notEquals,
        displayString: '!=',
    },
    // [WidgetOperatorName.groupBy]: {
    //     name: WidgetOperatorName.groupBy,
    //     displayString: 'Group By',
    //     kind: WidgetOperatorKind.groupBy,
    // },
    [WidgetOperatorName.sort]: {
        name: WidgetOperatorName.sort,
        displayString: 'Sort',
    },
} as const;

export const widgetOperators: WidgetOperator[] = Object.values(widgetOperatorMap);

export const widgetColumns: WidgetColumn[] = [
    { name: 'movie', displayString: 'Movie' },
    { name: 'firstName', displayString: 'First name' },
    { name: 'lastName', displayString: 'Last name' },
    { name: 'age', displayString: 'Age' },
    { name: 'role', displayString: 'Role' },
    { name: 'birthday', displayString: 'Birthday' },
];
