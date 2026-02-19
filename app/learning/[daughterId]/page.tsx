import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { DaughterDashboard } from "@/components/learning/daughter-dashboard";
import { getDaughterConfig } from "@/lib/daughters";

interface DaughterLearningPageProps {
  params: {
    daughterId: string;
  };
}

export default async function DaughterLearningPage({ params }: DaughterLearningPageProps) {
  const { daughterId } = params;
  
  // 验证女儿ID
  const validDaughterIds = ["najing", "naxin"];
  if (!validDaughterIds.includes(daughterId.toLowerCase())) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect('/login');
  }

  // 获取女儿配置
  const daughterKey = daughterId.toUpperCase() as "NAJING" | "NAXIN";
  const config = getDaughterConfig(daughterKey);
  
  // 查找孩子用户
  const childName = daughterKey === "NAJING" ? "黄乃静" : "黄乃馨";
  const childUser = await db.user.findFirst({
    where: {
      name: childName,
      parentId: session.user.id,
    },
  });

  let progress = {
    wordsLearned: 0,
    studyTime: 0,
    streakDays: 0,
    accuracy: 0,
  };

  if (childUser) {
    // 从 StudyRecord 计算真实进度
    const totalRecords = await db.studyRecord.count({
      where: { userId: childUser.id },
    });
    const correctRecords = await db.studyRecord.count({
      where: { userId: childUser.id, correct: true },
    });

    const uniqueCorrectWords = await db.studyRecord.groupBy({
      by: ["wordId"],
      where: { userId: childUser.id, correct: true },
    });

    const responseTimes = await db.studyRecord.aggregate({
      where: { userId: childUser.id },
      _sum: { responseTime: true },
    });

    progress = {
      wordsLearned: uniqueCorrectWords.length,
      studyTime: Math.round((responseTimes._sum.responseTime || 0) / 1000 / 60 / 60 * 10) / 10, // hours, rounded
      streakDays: 0, // TODO: implement streak calculation
      accuracy: totalRecords > 0 ? Math.round((correctRecords / totalRecords) * 100) : 0,
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <DaughterDashboard 
          daughterId={daughterKey}
          userName={config.info.displayName}
          progress={progress}
        />
      </div>
    </div>
  );
}
