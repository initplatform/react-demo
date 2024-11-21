import type { WidgetColumn, WidgetOperator, WidgetOperatorMap } from '@/types/chip-widget';
import { WidgetOperatorKind, WidgetOperatorName } from '@/types/chip-widget';

export const widgetOperatorMap: WidgetOperatorMap = {
    [WidgetOperatorName.contains]: {
        name: WidgetOperatorName.contains,
        displayString: 'contains',
        kind: WidgetOperatorKind.filter,
    },
    [WidgetOperatorName.equals]: {
        name: WidgetOperatorName.equals,
        displayString: '=',
        kind: WidgetOperatorKind.filter,
    },
    [WidgetOperatorName.greaterThan]: {
        name: WidgetOperatorName.greaterThan,
        displayString: '>',
        kind: WidgetOperatorKind.filter,
    },
    [WidgetOperatorName.lessThan]: {
        name: WidgetOperatorName.lessThan,
        displayString: '<',
        kind: WidgetOperatorKind.filter,
    },
    [WidgetOperatorName.notEquals]: {
        name: WidgetOperatorName.notEquals,
        displayString: '!=',
        kind: WidgetOperatorKind.filter,
    },
    // [WidgetOperatorName.groupBy]: {
    //     name: WidgetOperatorName.groupBy,
    //     displayString: 'Group By',
    //     kind: WidgetOperatorKind.groupBy,
    // },
    [WidgetOperatorName.sort]: {
        name: WidgetOperatorName.sort,
        displayString: 'Sort',
        kind: WidgetOperatorKind.sort,
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
