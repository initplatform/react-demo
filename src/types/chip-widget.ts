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
    input?: WidgetOperatorInput;
}

export type WidgetOperatorInput = string | Date | WidgetSortDirection | null;

export enum WidgetOperatorName {
    contains = 'contains',
    equals = 'equals',
    greaterThan = 'greaterThan',
    lessThan = 'lessThan',
    notEquals = 'notEquals',
    sort = 'sort',
    // groupBy = 'groupBy',
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
    operator?: WidgetOperator;
}

export enum WidgetSortDirection {
    asc = 'asc',
    desc = 'desc',
}
