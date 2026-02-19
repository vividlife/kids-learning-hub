import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import SelectDaughterClient from "./SelectDaughterClient";

export default async function SelectDaughterPage() {
  const session = await getServerSession(authOptions);
  
  // If no session, redirect to login
  if (!session?.user) {
    redirect("/login");
  }
  
  // If user is not a parent, redirect to appropriate page
  if (session.user.role !== "PARENT") {
    // If child, redirect to their learning page
    if (session.user.role === "CHILD") {
      redirect(`/learning/${session.user.id}`);
    }
    redirect("/");
  }
  
  // Fetch children for this parent
  let children = [];
  try {
    children = await db.user.findMany({
      where: {
        parentId: session.user.id,
        role: "CHILD",
      },
      select: {
        id: true,
        name: true,
        age: true,
        grade: true,
        learningLevel: true,
        avatar: true,
        points: true,
        totalPoints: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching children:", error);
    // Fallback to hardcoded daughters if database fails
    children = [
      {
        id: "najing",
        name: "黄乃静",
        age: 9,
        grade: "GRADE_3",
        learningLevel: "BEGINNER",
        avatar: null,
        points: 0,
        totalPoints: 0,
      },
      {
        id: "naxin",
        name: "黄乃馨",
        age: 15,
        grade: "SENIOR_HIGH_1",
        learningLevel: "ADVANCED",
        avatar: null,
        points: 0,
        totalPoints: 0,
      },
    ];
  }
  
  return <SelectDaughterClient children={children} />;
}