import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/layout/Footer';

const LAST_UPDATED = 'September 2026';

export function LegalNoticePage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Legal Notice | Yann TOISON-CHABANE';
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <header className="legal-header">
        <a className="legal-header__home" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to home</span>
        </a>
      </header>

      <main className="legal-page">
        <p className="legal-page__label">Legal information</p>
        <h1>Legal Notice</h1>
        <p className="legal-page__intro">
          In accordance with Article 6 III of French Act No. 2004-575 of 21 June
          2004 on confidence in the digital economy, this page identifies the
          publisher and the host of this website.
        </p>

        <section className="legal-section" aria-labelledby="legal-publisher">
          <h2 id="legal-publisher">Publisher</h2>
          <p>This website is published in a personal, non-commercial capacity by:</p>
          <ul>
            <li>Yann TOISON-CHABANE</li>
            <li>Software engineering student at EPITECH</li>
            <li>Issenheim (68500), France</li>
            <li>
              Email:{' '}
              <a href="mailto:yann.toison-chabane@epitech.eu">
                yann.toison-chabane@epitech.eu
              </a>
            </li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="legal-director">
          <h2 id="legal-director">Publication director</h2>
          <p>Yann TOISON-CHABANE.</p>
        </section>

        <section className="legal-section" aria-labelledby="legal-host">
          <h2 id="legal-host">Hosting</h2>
          <p>This website is hosted and delivered by:</p>
          <ul>
            <li>Cloudflare, Inc.</li>
            <li>101 Townsend Street, San Francisco, CA 94107, USA</li>
            <li>
              <a href="https://www.cloudflare.com" target="_blank" rel="noreferrer">
                www.cloudflare.com
              </a>
            </li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="legal-ip">
          <h2 id="legal-ip">Intellectual property</h2>
          <p>
            Unless stated otherwise, all content on this website (text, source
            code, graphics, and project write-ups) belongs to Yann TOISON-CHABANE.
            Any reproduction, representation, or distribution, in whole or in part,
            without prior permission is prohibited. Third-party trademarks, logos,
            and project names remain the property of their respective owners.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-data">
          <h2 id="legal-data">Personal data and cookies</h2>
          <p>
            This portfolio sets no tracking cookies and collects no personal data
            without your knowledge. The only data processed is what you send
            voluntarily, for example when contacting me by email. Technical logs
            (IP address, timestamp) may be kept briefly by the host for security
            and reliability.
          </p>
          <p>
            Under the General Data Protection Regulation (GDPR) and the French Data
            Protection Act, you have the right to access, correct, and delete your
            personal data. To exercise it, write to{' '}
            <a href="mailto:yann.toison-chabane@epitech.eu">
              yann.toison-chabane@epitech.eu
            </a>
            .
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-links">
          <h2 id="legal-links">External links</h2>
          <p>
            This website links to external sites (GitHub, LinkedIn, YouTube,
            etc.). Yann TOISON-CHABANE has no control over those sites and accepts
            no responsibility for their content.
          </p>
        </section>

        <p className="legal-page__updated">Last updated: {LAST_UPDATED}</p>
      </main>

      <Footer />
    </>
  );
}
