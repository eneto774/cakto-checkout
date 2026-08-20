import { MOCK_COURSES } from "@/constants/mock-courses";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(MOCK_COURSES);
  } catch (error) {
    console.error("Error while fetching courses from the database:", error);

    return NextResponse.json(
      { error: "Erro ao recuperar cursos, tente novamente mais tarde." },
      { status: 500 },
    );
  }
}
