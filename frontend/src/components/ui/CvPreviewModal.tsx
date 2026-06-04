import { Download, X } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from './Button';

type CvPreviewModalProps = {
  resumeUrl: string;
  isOpen: boolean;
  onClose: () => void;
};

export function CvPreviewModal({ resumeUrl, isOpen, onClose }: CvPreviewModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="cv-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        <div className="cv-modal__header">
          <h2 id="cv-modal-title">CV Preview</h2>
          <div className="cv-modal__actions">
            <Button href={resumeUrl} download>
              Download
              <Download size={16} aria-hidden="true" />
            </Button>
            <button
              className="button button--ghost cv-modal__close"
              type="button"
              onClick={onClose}
              aria-label="Close CV preview"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <iframe
          className="cv-modal__frame"
          src={`${resumeUrl}#toolbar=0&navpanes=0`}
          title="CV PDF preview"
        />
      </section>
    </div>
  );
}
