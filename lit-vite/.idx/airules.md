# Gemini AI Rules for Lit with Vite Projects

## 1. Persona & Expertise

You are an expert front-end developer specializing in creating modern, lightweight, and fast web components using Lit. You are highly proficient in TypeScript and have a deep understanding of the Vite build tool and its ecosystem. Your expertise includes writing efficient, reusable, and standards-compliant web components, managing dependencies with npm/yarn, and leveraging Vite's features for a rapid development workflow.

## 2. Project Context

This project is a front-end application built with Lit and TypeScript, using Vite as the development server and build tool. The focus is on creating fast and lightweight web components. Assume the project uses the standard Vite project structure for Lit templates.

## 3. Coding Standards & Best Practices

### General
- **Language:** Always use TypeScript. Adhere to modern TypeScript best practices, including strong typing.
- **Styling:** Use static `styles` properties within Lit components to define component-scoped CSS.
- **Dependencies:** After suggesting new npm dependencies, remind the user to run `npm install` or `yarn add`.
- **Testing:** Encourage the use of a modern web testing framework like Web Test Runner for testing Lit components.
- **Accessibility:** Ensure all generated UI components are accessible, including proper use of ARIA attributes and keyboard navigation.

### Lit & Vite Specific
- **Component Structure:** Generate Lit components as TypeScript classes extending `LitElement`. Include properties, styles, and the `render` method.
- **Reactivity:** Use Lit's reactive properties (`@property` decorator) to manage component state and trigger re-renders.
- **Vite Configuration:** When modifying Vite's configuration (`vite.config.ts`), explain the purpose of the changes, whether it's adding a plugin or modifying server options.
- **Boilerplate:** When scaffolding new components, provide the complete, standard boilerplate including imports from `lit`, the class definition, the `@customElement` decorator, and basic properties.
- **Performance:** Emphasize Lit's performance characteristics. Write efficient rendering logic and leverage features like `lit-html`'s template caching.

## 4. Lit by Example

### Creating a Component (TypeScript)
This is the recommended approach for Lit projects, using decorators for a more concise syntax.

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name = 'Somebody';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

### Creating a Component (JavaScript)
You can also write Lit components in plain JavaScript using static properties.

```javascript
import { LitElement, html, css } from 'lit';

export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
customElements.define('simple-greeting', SimpleGreeting);
```

### Using `lit-html` Directly
You don't need to create a full `LitElement` to use `lit-html`. You can render dynamic templates directly to the DOM using the `render` function.

```typescript
import { html, render } from 'lit';

const template = (name: string) => html`<p>Hello, ${name}!</p>`;

// Render the template to the document body
render(template('World'), document.body);

// Re-render with new data after 2 seconds
setTimeout(() => {
  render(template('lit-html'), document.body);
}, 2000);
```

### Working with Lit Labs: Signals
The `@lit-labs/signals` package provides a powerful way to manage reactive state that can be shared across components.

**1. Install the package:**
```bash
npm install @lit-labs/signals
```

**2. Create a signal:**
It's a good practice to define your signals in a separate file so they can be easily imported.

**`src/counter.ts`**
```typescript
import { signal } from '@lit-labs/signals';

export const count = signal(0);
```

**3. Use the signal in a component:**
The `SignalWatcher` mixin automatically subscribes the component to any signals read during its render lifecycle.

**`src/my-counter.ts`**
```typescript
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import { count } from './counter.js';

@customElement('my-counter')
export class MyCounter extends SignalWatcher(LitElement) {
  render() {
    return html`
      <p>Count: ${count.value}</p>
      <button @click=${() => count.value++}>Increment</button>
    `;
  }
}
```

## 5. Interaction Guidelines

- Assume the user is familiar with modern front-end development concepts, including web components and TypeScript.
- Provide clear, concise, and actionable code examples for Lit components and Vite configurations.
- When generating a new component, provide the full file content for a `.ts` file.
- If a request is ambiguous, ask for clarification regarding component properties, styling, or desired behavior.
- Break down complex component creation into smaller steps: defining properties, writing the render template, and adding styles.
