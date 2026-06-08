import type { ReactNode } from 'react';

type PhonePreviewProps = {
  children: ReactNode;
  label: string;
};

export function PhonePreview({ children, label }: PhonePreviewProps) {
  return (
    <div className="sg-validation-pair">
      <p className="sg-preview-label">{label}</p>
      <div className="sg-phone-wrap">
        <div className="my-phone">{children}</div>
      </div>
    </div>
  );
}
