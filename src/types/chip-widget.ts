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
    contains = 'contains',
    equals = 'equals',
    greaterThan = 'greaterThan',
    lessThan = 'lessThan',
    notEquals = 'notEquals',
    sort = 'sort',
    // groupBy = 'groupBy',
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

export interface WidgetColumnSelected extends WidgetColumn {
    id: string;
    filter?: WidgetFilter;
    sort?: WidgetSortDirection;
}

export interface WidgetFilter {
    column: WidgetColumn;
    operator: WidgetOperator;
    input: WidgetFilterInput;
}
export enum WidgetFilterKind {
    string = 'string',
    date = 'date',
    number = 'number',
}

export interface WidgetFilterInput {
    kind: WidgetFilterKind;
    value: string;
}

export enum WidgetSortDirection {
    asc = 'asc',
    desc = 'desc',
}
