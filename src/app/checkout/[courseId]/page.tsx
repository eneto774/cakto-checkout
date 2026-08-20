import { CheckoutForm } from "@/components/checkout-form";
import { getCourse } from "@/services/getCourse";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourse(parseInt(courseId));

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-black p-4 sm:p-8">
      <img src="/logo.png" alt="Logo" className="max-w-[300px]" />
      <main className="flex w-full flex-col">
        <CheckoutForm course={course} />
      </main>
    </div>
  );
}
