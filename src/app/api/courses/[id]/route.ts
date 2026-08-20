import { MOCK_COURSES } from "@/constants/mock-courses";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const course = MOCK_COURSES.find((c) => c.id === parseInt(id));

    if (!course) {
      return NextResponse.json(
        { error: "Curso não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error while fetching courses from the database:", error);

    return NextResponse.json(
      { error: "Erro ao recuperar cursos, tente novamente mais tarde." },
      { status: 500 },
    );
  }
}
