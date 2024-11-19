# Chip Widget

## Purpose

The chip widget enables users to filter, group, and sort datasets dynamically, visualizing conditions as
"chips." This supports advanced data manipulation workflows.

## Features

- Column Selection
  - A text input where the user starts typing to search for and select a column.

- Dynamic Action Selection
  - After selecting a column, a dropdown appears with options:
    - Filter (choose an operator and input a value).
    - Group By (limited to one column).
    - Sort (choose ascending or descending order).

- Dynamic Input Types
  - Adapt filter inputs based on column types (e.g., text, number, date).

- Chip Visualization
  - Represent filters, group-by columns, and sort conditions as removable/editable chips.

- Reset & Clear
  - Clear chips with one click.
  - Clear all chips with one click.

## User Flow

- User starts typing in the text field to search for a column.

- After selecting a column:
  - A dropdown allows the user to choose an action:
    - Filter: Choose an operator and input a value.
    - Group By: Group data by the selected column (one column only).
    - Sort: Choose ascending or descending order.

- After the user confirms the action, the condition appears as a chip.

- Chips can be removed or edited.

## Components

- FilterWidget
  - Manages state for filters, group-by, and sort conditions.
  - Passes props to child components.

- ColumnInput
  - A text field with autocomplete for selecting a column.

- ActionSelector
  - Dropdown that appears after column selection, offering actions: Filter, Group By, or Sort.

- FilterInput
  - A subcomponent for selecting an operator and entering a value when "Filter" is chosen.

- ChipList
  - Unified chip display for filters, the grouped column, and sort conditions.

## State Management

- Columns
  - Array of column names and types.

- Filters
  - Array of filter objects:

```ts
{ column: string; operator: string; value: string }
```

- Group-By
  - A single string for the grouped column:

```ts
string | null
```

- Sort
  - A single object for sorting:

```ts
{ column: string; order: "ASC" | "DESC" } | null
```

## Technologies

- React

- Typescript
