export interface PixarCharacter {
    movie: string;
    firstName: string;
    lastName: string;
    age: number;
    role: 'Protagonist' | 'Antagonist';
    birthday: string;
}

export interface WidgetOperator<T = WidgetOperatorName> {
    name: T;
    displayString: string;
    kind: WidgetOperatorKind;
}

export enum WidgetOperatorName {
    equals = 'equals',
    greaterThan = 'greaterThan',
    lessThan = 'lessThan',
    notEquals = 'notEquals',
    groupBy = 'groupBy',
    sort = 'sort',
}

export enum WidgetOperatorKind {
    filter = 'filter',
    groupBy = 'groupBy',
    sort = 'sort',
}

export type WidgetOperatorMap = {
    [K in WidgetOperatorName]: WidgetOperator<K>;
};

export interface WidgetColumn {
    name: string;
    displayString: string;
}
