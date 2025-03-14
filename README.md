# Web-Component-Dropdown

A lightweight, customizable dropdown component built using Web Components. This custom element can be used in any web application regardless of the framework.

## Features

- 🎨 Different color variants
- 📱 Optional menu alliggnment

## API

### Properties

| Property        | Attribute        | Type                                                                     | Default              | Description                                        |
| --------------- | ---------------- | ------------------------------------------------------------------------ | -------------------- | -------------------------------------------------- |
| `options`       | `options`        | Array<{value: string, label: string}>                                    | `[]`                 | Array of dropdown options                          |
| `selectedIndex` | `selected-index` | Number                                                                   | `0`                  | The currently selected index (0 means placeholder) |
| `width`         | `width`          | String                                                                   | `'200px'`            | Width of the dropdown                              |
| `placeholder`   | `placeholder`    | String                                                                   | `'Select an option'` | Label for when no option is selected               |
| `optionsAlign`  | `options-align`  | 'left' \| 'right' \| undefined                                           | `undefined`          | Alignment of the dropdown options                  |
| `variant`       | `variant`        | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | `'primary'`          | Color variant of the dropdown                      |

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/web-component-dropdown.git
   cd web-component-dropdown
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create Build

   ```bash
   npm run build
   ```

4. Start the development server
   ```bash
   npm start
   ```
