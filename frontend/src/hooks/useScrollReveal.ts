import { useEffect, type DependencyList } from 'react';

export function useScrollReveal(dependencies: DependencyList = []) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-ready');

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}
