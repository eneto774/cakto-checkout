import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourses } from "@/services/getCourses";
import { Course } from "@/types/course";
import { LuShoppingCart } from "react-icons/lu";

export default async function Home() {
  const courses = await getCourses();
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-black">
      <img src="/logo.png" alt="Background" className="max-w-[300px]" />
      <main className="flex flex-col z-10 mb-20 items-center">
        <h1 className="text-4xl font-bold text-white col-span-3 mb-8 z-100 mt-10">
          Cursos em Promoção
        </h1>
        <section className="flex-1 w-full grid max-sm:grid-cols-1 max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2 grid-cols-3 gap-6 px-16 bg:transparent sm:items-start">
          {courses.map((course: Course) => (
            <Card
              className="relative mx-auto w-full max-w-sm pt-0"
              key={course.id}
            >
              <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
              <img
                src={course.image}
                alt={course.name}
                className="relative z-20 aspect-video w-full object-cover"
              />
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary" className="text-red-500">
                    Em Promoção
                  </Badge>
                </CardAction>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
                <div className="w-full mt-4 flex items-center gap-2 justify-end">
                  <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                    R$ {course.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    R$ {course.currentPrice.toFixed(2)}
                  </span>
                </div>
              </CardHeader>
              <CardFooter>
                <a href={`/checkout/${course.id}`} className="w-full">
                  <Button
                    type="button"
                    className="w-full h-10 bg-[#1D7A4A] hover:bg-[#1D7A4A] text-white"
                  >
                    <LuShoppingCart className="mr-2 h-4 w-4" />
                    Comprar
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
