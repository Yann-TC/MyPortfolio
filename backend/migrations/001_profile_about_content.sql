ALTER TABLE profile_settings
ADD COLUMN recommendation_letter_url TEXT;

ALTER TABLE profile_settings
ADD COLUMN profile_title TEXT;

ALTER TABLE profile_settings
ADD COLUMN profile_intro TEXT;

ALTER TABLE profile_settings
ADD COLUMN profile_lead TEXT;

ALTER TABLE profile_settings
ADD COLUMN profile_experience TEXT;

ALTER TABLE profile_settings
ADD COLUMN profile_projects TEXT;

UPDATE profile_settings
SET
  recommendation_letter_url = COALESCE(
    recommendation_letter_url,
    '/documents/lettre_recommandation_yann_tc_akord.pdf'
  ),
  profile_title = COALESCE(
    profile_title,
    'Engineering student with production frontend experience.'
  ),
  profile_intro = COALESCE(
    profile_intro,
    'Focused on building reliable, readable software across modern frontend, backend services, and lower-level systems.'
  ),
  profile_lead = COALESCE(
    profile_lead,
    'Third-year student at EPITECH Mulhouse, building a profile between product interfaces and lower-level engineering fundamentals.'
  ),
  profile_experience = COALESCE(
    profile_experience,
    'At AkorD, I worked on Kare in a production TypeScript monorepo: landing page, attachment flows, mobile interventions, and Cypress regression work.'
  ),
  profile_projects = COALESCE(
    profile_projects,
    'Outside client work, I like projects where code has to move: network games, graphics experiments, hackathons, and teaching sessions.'
  ),
  updated_at = CURRENT_TIMESTAMP;
