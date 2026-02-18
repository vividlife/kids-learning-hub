// 应用常量配置

// 用户角色
export const USER_ROLES = {
  PARENT: "PARENT",
  CHILD: "CHILD",
  ADMIN: "ADMIN",
} as const;

// 难度级别
export const DIFFICULTY_LEVELS = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
} as const;

// 单词状态
export const WORD_STATUS = {
  NEW: "NEW",
  LEARNING: "LEARNING",
  REVIEW: "REVIEW",
  MASTERED: "MASTERED",
} as const;

// 题目类型
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  FILL_IN_BLANK: "FILL_IN_BLANK",
  MATCHING: "MATCHING",
  SEQUENCING: "SEQUENCING",
  TRUE_FALSE: "TRUE_FALSE",
} as const;

// 内容类型
export const CONTENT_TYPES = {
  PDF: "PDF",
  IMAGE: "IMAGE",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
  DOCUMENT: "DOCUMENT",
} as const;

// 学习主题分类
export const WORD_CATEGORIES = [
  "动物",
  "食物",
  "颜色",
  "数字",
  "家庭",
  "学校",
  "身体部位",
  "交通工具",
  "天气",
  "季节",
  "水果",
  "蔬菜",
  "职业",
  "国家",
  "城市",
  "家具",
  "玩具",
  "衣服",
  "运动",
  "乐器",
] as const;

// 学科分类
export const SUBJECTS = [
  "英语",
  "数学",
  "科学",
  "语文",
  "艺术",
  "音乐",
  "体育",
  "社会",
] as const;

// 年级枚举
export const CHILD_GRADES = {
  PRESCHOOL: "PRESCHOOL",      // 幼儿园
  GRADE_1: "GRADE_1",          // 一年级
  GRADE_2: "GRADE_2",          // 二年级
  GRADE_3: "GRADE_3",          // 三年级（黄乃静）
  GRADE_4: "GRADE_4",          // 四年级
  GRADE_5: "GRADE_5",          // 五年级
  GRADE_6: "GRADE_6",          // 六年级
  JUNIOR_HIGH_1: "JUNIOR_HIGH_1", // 初一
  JUNIOR_HIGH_2: "JUNIOR_HIGH_2", // 初二
  JUNIOR_HIGH_3: "JUNIOR_HIGH_3", // 初三
  SENIOR_HIGH_1: "SENIOR_HIGH_1", // 高一（黄乃馨）
  SENIOR_HIGH_2: "SENIOR_HIGH_2", // 高二
  SENIOR_HIGH_3: "SENIOR_HIGH_3", // 高三
  COLLEGE: "COLLEGE",          // 大学
} as const;

// 年级显示名称
export const GRADE_DISPLAY_NAMES: Record<string, string> = {
  PRESCHOOL: "幼儿园",
  GRADE_1: "一年级",
  GRADE_2: "二年级",
  GRADE_3: "三年级",
  GRADE_4: "四年级",
  GRADE_5: "五年级",
  GRADE_6: "六年级",
  JUNIOR_HIGH_1: "初一",
  JUNIOR_HIGH_2: "初二",
  JUNIOR_HIGH_3: "初三",
  SENIOR_HIGH_1: "高一",
  SENIOR_HIGH_2: "高二",
  SENIOR_HIGH_3: "高三",
  COLLEGE: "大学",
};

// 学习级别
export const LEARNING_LEVELS = {
  BEGINNER: "BEGINNER",       // 初级（黄乃静级别）
  INTERMEDIATE: "INTERMEDIATE", // 中级
  ADVANCED: "ADVANCED",       // 高级（黄乃馨级别）
} as const;

// 学习级别显示名称
export const LEVEL_DISPLAY_NAMES: Record<string, string> = {
  BEGINNER: "初级",
  INTERMEDIATE: "中级",
  ADVANCED: "高级",
};

// 游戏类型
export const GAME_TYPES = {
  MATCHING_GAME: "matching_game",
  SPELLING_BEE: "spelling_bee",
  MEMORY_GAME: "memory_game",
  WORD_SEARCH: "word_search",
  CROSSWORD: "crossword",
} as const;

// 成就类型
export const ACHIEVEMENT_TYPES = {
  WORD_MASTER: "word_master",
  PERFECT_SCORE: "perfect_score",
  STREAK_KEEPER: "streak_keeper",
  EARLY_BIRD: "early_bird",
  NIGHT_OWL: "night_owl",
  SPEED_LEARNER: "speed_learner",
  CONSISTENT_LEARNER: "consistent_learner",
  SISTER_COMPETITION_WINNER: "sister_competition_winner",
  SISTER_COLLABORATION: "sister_collaboration",
  GRADE_SPECIFIC: "grade_specific",
} as const;

// 姐妹关系类型
export const SISTER_RELATIONSHIPS = {
  SISTERS: "SISTERS",
  COMPETITION: "COMPETITION",
  COLLABORATION: "COLLABORATION",
} as const;

// 姐妹竞赛类型
export const SISTER_COMPETITION_TYPES = {
  WORD_COUNT: "WORD_COUNT",
  QUIZ_SCORE: "QUIZ_SCORE",
  STUDY_TIME: "STUDY_TIME",
  CORRECT_RATE: "CORRECT_RATE",
  STREAK_DAYS: "STREAK_DAYS",
} as const;

// 通知类型
export const NOTIFICATION_TYPES = {
  ACHIEVEMENT: "achievement",
  REMINDER: "reminder",
  PROGRESS: "progress",
  SYSTEM: "system",
} as const;

// 学习计划类型
export const LEARNING_PLAN_TYPES = {
  DAILY: "daily",
  WEEKLY: "weekly",
  CUSTOM: "custom",
} as const;

// 学习任务类型
export const LEARNING_TASK_TYPES = {
  WORD_STUDY: "word_study",
  QUIZ: "quiz",
  READING: "reading",
  GAME: "game",
  VIDEO: "video",
} as const;

// 文件上传限制
export const FILE_UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_AUDIO_TYPES: ["audio/mpeg", "audio/wav", "audio/ogg"],
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/webm", "video/ogg"],
  ALLOWED_DOCUMENT_TYPES: ["application/pdf", "text/plain"],
} as const;

// 颜色主题
export const COLOR_THEMES = {
  BLUE: {
    primary: "#4F46E5",
    secondary: "#8B5CF6",
    accent: "#EC4899",
  },
  GREEN: {
    primary: "#10B981",
    secondary: "#34D399",
    accent: "#F59E0B",
  },
  PURPLE: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    accent: "#F97316",
  },
} as const;

// 默认配置
export const DEFAULT_CONFIG = {
  // 黄乃静（三年级）配置
  NAJING: {
    DAILY_WORD_GOAL: 5,
    WEEKLY_STUDY_GOAL: 2, // 小时
    MAX_SESSION_TIME: 20, // 分钟
    REVIEW_INTERVAL_DAYS: [1, 3, 7],
    QUIZ_PASSING_SCORE: 70,
    GAME_RATIO: 0.6, // 游戏化内容占比
  },
  // 黄乃馨（高一）配置
  NAXIN: {
    DAILY_WORD_GOAL: 15,
    WEEKLY_STUDY_GOAL: 5, // 小时
    MAX_SESSION_TIME: 45, // 分钟
    REVIEW_INTERVAL_DAYS: [1, 3, 7, 14, 30],
    QUIZ_PASSING_SCORE: 80,
    GAME_RATIO: 0.2, // 游戏化内容占比
  },
  // 通用配置
  GENERAL: {
    MAX_DAILY_STUDY_TIME: 120, // 分钟
    SISTER_COMPETITION_DURATION: 7, // 天
    ACHIEVEMENT_NOTIFICATION: true,
    PROGRESS_REPORT_FREQUENCY: "weekly", // weekly, monthly
  },
} as const;

// 路由路径
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PARENT_DASHBOARD: "/parent/dashboard",
  KID_DASHBOARD: "/kid/dashboard",
  WORD_STUDY: "/study/words",
  FLASHCARDS: "/study/flashcards",
  QUIZZES: "/study/quizzes",
  GAMES: "/games",
  PROGRESS: "/progress",
  ACHIEVEMENTS: "/achievements",
  SETTINGS: "/settings",
  UPLOAD: "/upload",
  LIBRARY: "/library",
} as const;

// API端点
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    SESSION: "/api/auth/session",
  },
  WORDS: {
    LIST: "/api/words",
    CREATE: "/api/words",
    UPDATE: "/api/words/[id]",
    DELETE: "/api/words/[id]",
    IMPORT: "/api/words/import",
    STUDY: "/api/words/study",
    PROGRESS: "/api/words/progress",
  },
  QUIZZES: {
    LIST: "/api/quizzes",
    CREATE: "/api/quizzes",
    ATTEMPT: "/api/quizzes/[id]/attempt",
    RESULTS: "/api/quizzes/[id]/results",
  },
  PROGRESS: {
    OVERVIEW: "/api/progress/overview",
    DETAILS: "/api/progress/details",
    CHARTS: "/api/progress/charts",
  },
  ACHIEVEMENTS: {
    LIST: "/api/achievements",
    UNLOCKED: "/api/achievements/unlocked",
  },
  FILES: {
    UPLOAD: "/api/files/upload",
    LIST: "/api/files",
    DELETE: "/api/files/[id]",
  },
  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions",
    EXPLAIN_CONCEPT: "/api/ai/explain",
    SUGGEST_CONTENT: "/api/ai/suggest",
  },
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
  THEME: "kids-learning-hub-theme",
  LANGUAGE: "kids-learning-hub-language",
  USER_PREFERENCES: "kids-learning-hub-preferences",
  STUDY_SESSION: "kids-learning-hub-session",
  RECENT_ACTIVITIES: "kids-learning-hub-recent",
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "网络连接失败，请检查网络设置",
  UNAUTHORIZED: "请先登录",
  FORBIDDEN: "没有权限访问此资源",
  NOT_FOUND: "请求的资源不存在",
  VALIDATION_ERROR: "输入数据验证失败",
  FILE_TOO_LARGE: "文件大小超过限制",
  INVALID_FILE_TYPE: "不支持的文件类型",
  DATABASE_ERROR: "数据库操作失败",
  AI_SERVICE_ERROR: "AI服务暂时不可用",
  RATE_LIMIT_EXCEEDED: "请求过于频繁，请稍后再试",
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "登录成功",
  REGISTER_SUCCESS: "注册成功",
  WORD_ADDED: "单词添加成功",
  QUIZ_COMPLETED: "测验完成",
  ACHIEVEMENT_UNLOCKED: "成就已解锁",
  FILE_UPLOADED: "文件上传成功",
  SETTINGS_SAVED: "设置已保存",
} as const;