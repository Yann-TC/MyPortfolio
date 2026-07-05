import { Download, Eye, FileText } from 'lucide-react';
import type { ProfileSettings } from '../../data/profile';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';

type PortfolioDocument = {
  title: string;
  description: string;
  url: string;
};

type DocumentsProps = {
  profile: ProfileSettings;
  onPreviewDocument: (document: PortfolioDocument) => void;
};

export function Documents({ profile, onPreviewDocument }: DocumentsProps) {
  const documents: PortfolioDocument[] = [
    {
      title: 'CV',
      description: 'Current resume with education, experience, projects, and skills.',
      url: profile.resumeUrl,
    },
    {
      title: 'Recommendation Letter',
      description: 'Reference letter from AkorD for my work on Kare.',
      url: profile.recommendationLetterUrl,
    },
  ];

  return (
    <Section
      id="documents"
      label="Documents"
      title="Preview or download all my documents."
      intro="My resume and recommendation letter are here."
    >
      <div className="documents-grid" data-reveal>
        {documents.map((document) => (
          <article className="document-card" key={document.url}>
            <div className="document-card__icon" aria-hidden="true">
              <FileText size={22} />
            </div>
            <div className="document-card__content">
              <h3>{document.title}</h3>
              <p>{document.description}</p>
            </div>
            <div className="document-card__actions">
              <button
                className="button button--secondary"
                type="button"
                onClick={() => onPreviewDocument(document)}
              >
                Preview
                <Eye size={17} aria-hidden="true" />
              </button>
              <Button href={document.url} download>
                Download
                <Download size={17} aria-hidden="true" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
