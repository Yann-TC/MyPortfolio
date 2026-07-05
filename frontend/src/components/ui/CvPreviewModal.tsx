import { Download, X } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from './Button';

type CvPreviewModalProps = {
  documentUrl: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function CvPreviewModal({
  documentUrl,
  title = 'CV Preview',
  isOpen,
  onClose,
}: CvPreviewModalProps) {
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
          <h2 id="cv-modal-title">{title}</h2>
          <div className="cv-modal__actions">
            <Button href={documentUrl} download>
              Download
              <Download size={16} aria-hidden="true" />
            </Button>
            <button
              className="button button--ghost cv-modal__close"
              type="button"
              onClick={onClose}
              aria-label={`Close ${title.toLowerCase()}`}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <iframe
          className="cv-modal__frame"
          src={`${documentUrl}#toolbar=0&navpanes=0`}
          title={`${title} PDF preview`}
        />
      </section>
    </div>
  );
}
