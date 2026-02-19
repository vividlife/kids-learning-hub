import { z } from "zod";

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "邮箱不能为空")
    .email("请输入有效的邮箱地址"),
  password: z
    .string()
    .min(1, "密码不能为空")
    .min(6, "密码至少需要6位"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register validation schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "姓名不能为空")
    .min(2, "姓名至少需要2位"),
  email: z
    .string()
    .min(1, "邮箱不能为空")
    .email("请输入有效的邮箱地址"),
  password: z
    .string()
    .min(1, "密码不能为空")
    .min(8, "密码至少需要8位")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "密码必须包含大小写字母和数字"),
  confirmPassword: z.string().min(1, "请确认密码"),
  role: z.enum(["PARENT", "CHILD"], {
    required_error: "请选择账户类型",
  }),
  age: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === "" || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    })
    .refine((val) => val === undefined || (val >= 3 && val <= 100), {
      message: "年龄必须在3-100岁之间",
    }),
  grade: z.string().optional(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "两次输入的密码不一致",
  path: ["confirmPassword"],
})
.refine((data) => {
  if (data.role === "CHILD") {
    return data.age !== undefined && data.age >= 3 && data.age <= 18;
  }
  return true;
}, {
  message: "孩子的年龄必须在3-18岁之间",
  path: ["age"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Word validation schema
export const wordSchema = z.object({
  word: z
    .string()
    .min(1, "单词不能为空")
    .min(2, "单词至少需要2个字母"),
  translation: z
    .string()
    .min(1, "翻译不能为空"),
  pronunciation: z.string().optional(),
  example: z.string().optional(),
  imageUrl: z.string().url("请输入有效的URL").optional().or(z.literal("")),
  audioUrl: z.string().url("请输入有效的URL").optional().or(z.literal("")),
  category: z.string().min(1, "请选择分类"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("EASY"),
  targetGrade: z.string().optional(),
  targetLevel: z.string().optional(),
  tags: z.string().optional(),
  status: z.enum(["NEW", "LEARNING", "REVIEW", "MASTERED"]).default("NEW"),
  childId: z.string().optional(), // For parent creating word for child
});

export type WordFormData = z.infer<typeof wordSchema>;

// API error response type
export interface ApiErrorResponse {
  error: string;
  details?: string;
  validationErrors?: Record<string, string[]>;
}