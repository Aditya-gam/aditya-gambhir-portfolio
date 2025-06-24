import { SocialProfile } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Social Profiles Data
// ─────────────────────────────────────────────────────────────────────────────

export const socialProfiles: SocialProfile[] = [
  {
    platform: 'linkedin',
    name: 'Aditya Gambhir',
    username: 'aditya-gambhir',
    headline:
      'MS Computational Data Science | Full-Stack Developer | Expertise in Machine Learning, Computer Vision',
    profileUrl: 'https://www.linkedin.com/in/aditya-gambhir/',
    details: [
      //   { label: 'Company', value: 'Tech Mahindra' },
      { label: 'Education', value: 'University of California, Riverside' },
      //   { label: 'Location', value: 'Riverside, California' },
    ],
    stats: [
      { label: 'Experience', value: '2+ Years' },
      { label: 'Connections', value: '600+' },
    ],
  },
  {
    platform: 'github',
    name: 'Aditya Gambhir',
    username: 'Aditya-gam',
    headline:
      "🎓 Master's Student in CDS | UCR '25🌟 | Passionate about AI/ML | Fullstack Developer Enthusiast 💻🤖",
    profileUrl: 'https://github.com/Aditya-gam/',
    details: [
      { label: 'University', value: 'University of California, Riverside' },
      { label: 'Location', value: 'Riverside, California' },
      //   { label: 'Timezone', value: 'UTC -07:00' },
    ],
    stats: [
      { label: 'Repositories', value: '73' },
      //   { label: 'Followers', value: '2' },
      //   { label: 'Following', value: '2' },
    ],
  },
  {
    platform: 'leetcode',
    name: 'Aditya Gambhir',
    username: 'ByteAditya19',
    headline:
      'Passionate Problem Solver | Data Structures & Algorithms Enthusiast | Competitive Programming',
    profileUrl: 'https://leetcode.com/u/ByteAditya19/',
    details: [
      { label: 'Focus', value: 'Data Structures & Algorithms' },
      { label: 'Languages', value: 'Python, C++, Java' },
      { label: 'Specialty', value: 'Dynamic Programming, Graph Theory' },
    ],
    stats: [
      { label: 'Problems Solved', value: '450+' },
      //   { label: 'Contest Rating', value: '1400+' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Utility helpers
// ─────────────────────────────────────────────────────────────────────────────

export const getSocialProfileByPlatform = (
  platform: string,
): SocialProfile | undefined =>
  socialProfiles.find((profile) => profile.platform === platform);

export const getAllSocialProfiles = (): SocialProfile[] => socialProfiles;

export const getFeaturedSocialProfiles = (): SocialProfile[] =>
  socialProfiles.slice(0, 3);
