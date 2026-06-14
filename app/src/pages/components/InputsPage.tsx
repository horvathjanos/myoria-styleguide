import type { ReactElement } from 'react';

import { StyleguidePage } from '../../shell/StyleguidePage';

export function InputsPage(): ReactElement {
  return (
    <StyleguidePage
      title="Inputs"
      description="Line inputs avoid rounded boxes and preserve the measurement-instrument surface."
    >
      <form className="my-form">
        <label className="my-field" htmlFor="search">
          <span className="my-field-label">SEARCH</span>
          <input
            className="my-line-input"
            id="search"
            placeholder="Search items"
          />
        </label>
        <label className="my-field" htmlFor="name">
          <span className="my-field-label">NAME</span>
          <input
            className="my-line-input"
            id="name"
            readOnly
            value="Protein drink"
          />
          <span className="my-field-help">
            Field help stays near the control.
          </span>
        </label>
        <label className="my-field" htmlFor="error">
          <span className="my-field-label">ERROR EXAMPLE</span>
          <input
            className="my-line-input is-error"
            id="error"
            placeholder="Required value"
          />
          <span className="my-inline-error">Name is required.</span>
        </label>
        <div className="my-warning-panel">
          <strong>Possible duplicate</strong>
          <span>Protein drink already exists in the library.</span>
        </div>
      </form>
    </StyleguidePage>
  );
}
