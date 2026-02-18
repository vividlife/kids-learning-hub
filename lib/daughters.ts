// 女儿专属配置文件
// 根据黄乃静（三年级）和黄乃馨（高一）的具体需求定制

import { CHILD_GRADES, LEARNING_LEVELS } from "@/lib/constants";

// 女儿信息
export const DAUGHTERS = {
  NAJING: {
    id: "najing",
    name: "黄乃静",
    displayName: "乃静",
    age: 9,
    grade: CHILD_GRADES.GRADE_3,
    learningLevel: LEARNING_LEVELS.BEGINNER,
    description: "三年级小学生，活泼好动，喜欢游戏化学习",
    avatarColor: "#EC4899", // 粉色
    theme: "cute",
  },
  NAXIN: {
    id: "naxin",
    name: "黄乃馨",
    displayName: "乃馨",
    age: 15,
    grade: CHILD_GRADES.SENIOR_HIGH_1,
    learningLevel: LEARNING_LEVELS.ADVANCED,
    description: "高一学生，需要系统化、高效率的学习",
    avatarColor: "#4F46E5", // 蓝色
    theme: "professional",
  },
} as const;

// 学习目标
export const LEARNING_GOALS = {
  NAJING: {
    // 英语学习目标
    ENGLISH: {
      vocabulary: {
        target: 300, // 300个基础单词
        categories: ["动物", "食物", "颜色", "数字", "家庭", "学校", "身体部位"],
      },
      grammar: {
        target: "掌握基础句型",
        topics: ["主谓宾结构", "一般现在时", "疑问句", "否定句"],
      },
      speaking: {
        target: "简单日常对话",
        scenarios: ["自我介绍", "家庭介绍", "学校生活", "购物"],
      },
    },
    // 数学学习目标
    MATH: {
      arithmetic: {
        target: "熟练掌握加减乘除",
        operations: ["加法", "减法", "乘法", "除法"],
      },
      concepts: {
        target: "理解基础数学概念",
        topics: ["分数", "小数", "几何图形", "时间"],
      },
    },
  },
  NAXIN: {
    // 英语学习目标
    ENGLISH: {
      vocabulary: {
        target: 2000, // 2000个扩展词汇
        categories: ["学术词汇", "科技词汇", "文学词汇", "商务词汇"],
      },
      grammar: {
        target: "完整语法体系",
        topics: ["时态", "语态", "从句", "虚拟语气", "倒装句"],
      },
      skills: {
        target: "综合应用能力",
        areas: ["阅读理解", "写作表达", "听力理解", "口语交流"],
      },
    },
    // 数学学习目标
    MATH: {
      algebra: {
        target: "代数基础",
        topics: ["方程", "不等式", "函数", "数列"],
      },
      geometry: {
        target: "几何知识",
        topics: ["平面几何", "立体几何", "解析几何"],
      },
      advanced: {
        target: "高级数学概念",
        topics: ["三角函数", "概率统计", "微积分基础"],
      },
    },
  },
} as const;

// 学习内容推荐
export const CONTENT_RECOMMENDATIONS = {
  NAJING: {
    // 单词学习
    WORDS: {
      dailyCount: 5,
      reviewFrequency: "daily",
      learningMethods: ["flashcards", "matchingGames", "spellingGames"],
      difficulty: "easy",
    },
    // 练习题
    EXERCISES: {
      types: ["multipleChoice", "fillInBlank", "matching"],
      timeLimit: 10, // 分钟
      feedback: "immediate",
    },
    // 游戏化元素
    GAMIFICATION: {
      pointsPerWord: 10,
      badgeThresholds: [50, 100, 200], // 单词数量
      dailyStreakBonus: true,
      leaderboard: true,
    },
  },
  NAXIN: {
    // 单词学习
    WORDS: {
      dailyCount: 15,
      reviewFrequency: "spacedRepetition",
      learningMethods: ["contextLearning", "wordRoots", "synonymsAntonyms"],
      difficulty: "medium",
    },
    // 练习题
    EXERCISES: {
      types: ["essayQuestions", "problemSolving", "criticalThinking"],
      timeLimit: 30, // 分钟
      feedback: "detailed",
    },
    // 游戏化元素
    GAMIFICATION: {
      pointsPerWord: 5,
      badgeThresholds: [500, 1000, 1500], // 单词数量
      dailyStreakBonus: true,
      leaderboard: false,
    },
  },
} as const;

// 界面设计配置
export const UI_CONFIG = {
  NAJING: {
    // 视觉设计
    VISUAL: {
      theme: "cute",
      colors: {
        primary: "#EC4899", // 粉色
        secondary: "#8B5CF6", // 紫色
        accent: "#F59E0B", // 橙色
        background: "#FEF3C7", // 浅黄色
      },
      fontSize: "large",
      iconSize: "large",
      animations: "playful",
    },
    // 布局设计
    LAYOUT: {
      navigation: "simple",
      contentDensity: "sparse",
      whitespace: "generous",
      gridColumns: 2,
    },
    // 交互设计
    INTERACTION: {
      feedback: "immediate",
      guidance: "detailed",
      errorTolerance: "high",
      confirmationSteps: 2,
    },
  },
  NAXIN: {
    // 视觉设计
    VISUAL: {
      theme: "professional",
      colors: {
        primary: "#4F46E5", // 蓝色
        secondary: "#10B981", // 绿色
        accent: "#6B7280", // 灰色
        background: "#F9FAFB", // 浅灰色
      },
      fontSize: "medium",
      iconSize: "medium",
      animations: "minimal",
    },
    // 布局设计
    LAYOUT: {
      navigation: "efficient",
      contentDensity: "dense",
      whitespace: "moderate",
      gridColumns: 3,
    },
    // 交互设计
    INTERACTION: {
      feedback: "subtle",
      guidance: "minimal",
      errorTolerance: "medium",
      confirmationSteps: 1,
    },
  },
} as const;

// 学习计划模板
export const STUDY_PLAN_TEMPLATES = {
  NAJING: {
    DAILY: [
      { time: "15分钟", activity: "单词闪卡学习", type: "vocabulary" },
      { time: "10分钟", activity: "单词游戏", type: "game" },
      { time: "15分钟", activity: "数学练习", type: "math" },
    ],
    WEEKLY: [
      { day: "周一", focus: "动物词汇 + 加法练习" },
      { day: "周二", focus: "食物词汇 + 减法练习" },
      { day: "周三", focus: "颜色词汇 + 乘法练习" },
      { day: "周四", focus: "复习日 + 综合练习" },
      { day: "周五", focus: "游戏日 + 趣味挑战" },
      { day: "周末", focus: "自由学习 + 姐妹比赛" },
    ],
  },
  NAXIN: {
    DAILY: [
      { time: "30分钟", activity: "词汇扩展学习", type: "vocabulary" },
      { time: "30分钟", activity: "语法练习", type: "grammar" },
      { time: "30分钟", activity: "数学专题学习", type: "math" },
      { time: "15分钟", activity: "复习与总结", type: "review" },
    ],
    WEEKLY: [
      { day: "周一", focus: "学术词汇 + 代数基础" },
      { day: "周二", focus: "阅读训练 + 几何知识" },
      { day: "周三", focus: "写作练习 + 函数概念" },
      { day: "周四", focus: "听力训练 + 数列学习" },
      { day: "周五", focus: "口语练习 + 综合复习" },
      { day: "周末", focus: "模拟测试 + 姐妹协作" },
    ],
  },
} as const;

// 姐妹协作功能
export const SISTER_FEATURES = {
  // 竞赛功能
  COMPETITIONS: {
    types: ["wordCount", "quizScore", "studyTime", "streakDays"],
    durations: ["daily", "weekly", "monthly"],
    rewards: ["virtualBadges", "braggingRights", "parentRecognition"],
  },
  // 协作功能
  COLLABORATIONS: {
    types: ["studyGroup", "projectWork", "peerReview", "knowledgeSharing"],
    tools: ["sharedWhiteboard", "chat", "fileSharing", "progressTracking"],
  },
  // 分享功能
  SHARING: {
    types: ["achievements", "studyTips", "resourceRecommendations", "progressUpdates"],
    channels: ["feed", "notifications", "directMessages", "familyDashboard"],
  },
} as const;

// 家长监控功能
export const PARENT_MONITORING = {
  // 进度报告
  PROGRESS_REPORTS: {
    frequency: "weekly",
    metrics: ["studyTime", "wordsLearned", "quizScores", "achievements"],
    format: ["visualCharts", "summaryText", "comparisonData"],
  },
  // 控制功能
  CONTROLS: {
    timeLimits: true,
    contentFiltering: true,
    goalSetting: true,
    rewardManagement: true,
  },
  // 通知功能
  NOTIFICATIONS: {
    types: ["achievements", "timeLimits", "progressMilestones", "sisterInteractions"],
    channels: ["email", "appNotifications", "dashboardAlerts"],
  },
} as const;

// 工具函数
export function getDaughterConfig(daughterId: keyof typeof DAUGHTERS) {
  return {
    info: DAUGHTERS[daughterId],
    goals: LEARNING_GOALS[daughterId],
    content: CONTENT_RECOMMENDATIONS[daughterId],
    ui: UI_CONFIG[daughterId],
    studyPlan: STUDY_PLAN_TEMPLATES[daughterId],
  };
}

export function getGradeDisplayName(grade: string): string {
  const gradeNames: Record<string, string> = {
    [CHILD_GRADES.PRESCHOOL]: "幼儿园",
    [CHILD_GRADES.GRADE_1]: "一年级",
    [CHILD_GRADES.GRADE_2]: "二年级",
    [CHILD_GRADES.GRADE_3]: "三年级",
    [CHILD_GRADES.GRADE_4]: "四年级",
    [CHILD_GRADES.GRADE_5]: "五年级",
    [CHILD_GRADES.GRADE_6]: "六年级",
    [CHILD_GRADES.JUNIOR_HIGH_1]: "初一",
    [CHILD_GRADES.JUNIOR_HIGH_2]: "初二",
    [CHILD_GRADES.JUNIOR_HIGH_3]: "初三",
    [CHILD_GRADES.SENIOR_HIGH_1]: "高一",
    [CHILD_GRADES.SENIOR_HIGH_2]: "高二",
    [CHILD_GRADES.SENIOR_HIGH_3]: "高三",
    [CHILD_GRADES.COLLEGE]: "大学",
  };
  return gradeNames[grade] || grade;
}

export function getLevelDisplayName(level: string): string {
  const levelNames: Record<string, string> = {
    [LEARNING_LEVELS.BEGINNER]: "初级",
    [LEARNING_LEVELS.INTERMEDIATE]: "中级",
    [LEARNING_LEVELS.ADVANCED]: "高级",
  };
  return levelNames[level] || level;
}

// 根据年级获取推荐配置
export function getConfigByGrade(grade: string) {
  if (grade === CHILD_GRADES.GRADE_3) {
    return getDaughterConfig("NAJING");
  } else if (grade === CHILD_GRADES.SENIOR_HIGH_1) {
    return getDaughterConfig("NAXIN");
  }
  
  // 默认配置
  return getDaughterConfig("NAJING");
}