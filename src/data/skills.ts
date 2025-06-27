/**
 * Skills enum with color mappings for the Skills Matrix component
 * Each skill category has a specific color theme that meets WCAG 2.1 AA contrast requirements
 */

export enum SkillCategory {
  LANGUAGES = 'Languages',
  FRAMEWORKS = 'Frameworks',
  DATA_AI = 'Data / AI',
  CLOUD_DEVOPS = 'Cloud & DevOps',
  DATABASES = 'Databases',
  TOOLING = 'Tooling',
}

export interface SkillColorMap {
  readonly bg: string;
  readonly text: string;
  readonly border: string;
  readonly icon: string;
}

/**
 * Color mapping for each skill category
 * All colors meet WCAG 2.1 AA contrast requirements (≥ 4.5:1)
 */
export const skillColorMap: Record<SkillCategory, SkillColorMap> = {
  [SkillCategory.LANGUAGES]: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  [SkillCategory.FRAMEWORKS]: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  [SkillCategory.DATA_AI]: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  [SkillCategory.CLOUD_DEVOPS]: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-800',
    icon: 'text-orange-600 dark:text-orange-400',
  },
  [SkillCategory.DATABASES]: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800',
    icon: 'text-indigo-600 dark:text-indigo-400',
  },
  [SkillCategory.TOOLING]: {
    bg: 'bg-slate-50 dark:bg-slate-950/30',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-800',
    icon: 'text-slate-600 dark:text-slate-400',
  },
};

/**
 * Get color mapping for a skill category
 * @param category - The skill category
 * @returns Color mapping object
 */
export function getSkillColors(category: SkillCategory): SkillColorMap {
  return skillColorMap[category];
}

/**
 * Skill icon mapping for common technologies
 */
export const skillIcons: Record<string, string> = {
  // Languages
  'C++': '⚡',
  Java: '☕',
  JavaScript: '🟨',
  TypeScript: '🔷',
  Python: '🐍',

  // Frameworks
  React: '⚛️',
  'Node.js': '🟢',
  'Spring Boot': '🍃',
  FastAPI: '⚡',

  // Data / AI
  Pandas: '🐼',
  NumPy: '🔢',
  TensorFlow: '🧠',
  Keras: '🎯',
  OpenCV: '👁️',

  // Cloud & DevOps
  AWS: '☁️',
  Docker: '🐳',
  Kubernetes: '⚓',

  // Databases
  PostgreSQL: '🐘',
  MongoDB: '🍃',
  MySQL: '🐬',

  // Tooling
  Git: '📝',
  'GitHub Actions': '⚙️',
  Jenkins: '🤖',
  Jira: '📋',
};

/**
 * Get icon for a skill
 * @param skill - The skill name
 * @returns Icon string or default icon
 */
export function getSkillIcon(skill: string): string {
  return skillIcons[skill] || '💻';
}
