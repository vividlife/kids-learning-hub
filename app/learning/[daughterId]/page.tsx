import { notFound } from "next/navigation";
import { DaughterDashboard } from "@/components/learning/daughter-dashboard";
import { getDaughterConfig } from "@/lib/daughters";

interface DaughterLearningPageProps {
  params: {
    daughterId: string;
  };
}

export default function DaughterLearningPage({ params }: DaughterLearningPageProps) {
  const { daughterId } = params;
  
  // 验证女儿ID
  const validDaughterIds = ["najing", "naxin"];
  if (!validDaughterIds.includes(daughterId.toLowerCase())) {
    notFound();
  }

  // 获取女儿配置
  const daughterKey = daughterId.toUpperCase() as "NAJING" | "NAXIN";
  const config = getDaughterConfig(daughterKey);
  
  // 模拟进度数据
  const mockProgress = {
    wordsLearned: daughterKey === "NAJING" ? 85 : 450,
    studyTime: daughterKey === "NAJING" ? 12 : 36,
    streakDays: daughterKey === "NAJING" ? 7 : 14,
    accuracy: daughterKey === "NAJING" ? 78 : 85,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <DaughterDashboard 
          daughterId={daughterKey}
          userName={config.info.displayName}
          progress={mockProgress}
        />
      </div>
    </div>
  );
}