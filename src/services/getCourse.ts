import { Course } from "@/types/course";

export const getCourse = async (courseId: number): Promise<Course> => {
  try {
    const course = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${courseId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    ).then((res) => res.json());

    if (!course) {
      throw new Error("Curso não encontrado com o id especificado.");
    }

    return course;
  } catch (error) {
    console.error("Error while fetching the course:", error);
    throw new Error("Erro ao recuperar o curso, tente novamente mais tarde.");
  }
};
