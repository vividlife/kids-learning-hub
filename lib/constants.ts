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

// 年级分类
export const GRADES = [
  "幼儿园",
  "一年级",
  "二年级",
  "三年级",
  "四年级",
  "五年级",
  "六年级",
] as const;

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
  DAILY_WORD_GOAL: 10,
  WEEKLY_STUDY_GOAL: 5, // 小时
  REVIEW_INTERVAL_DAYS: [1, 3, 7, 14, 30], // 艾宾浩斯复习间隔
  QUIZ_PASSING_SCORE: 70, // 百分比
  MAX_DAILY_STUDY_TIME: 120, // 分钟
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