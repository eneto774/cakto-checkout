import { MOCK_COURSE } from "@/constants";
import { formatCurrency } from "@/utils";

export default async function Home() {
  const { name, originalPrice, currentPrice } = MOCK_COURSE;
  return (
    <div className="min-h-screen bg-gray-100 py-6 font-sans">
      <main className="mx-auto flex w-full max-w-md flex-col gap-5 px-4">
        <section className="flex flex-col justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          <div className="text-xl font-bold">{name}</div>
          <div className="text-gray-500 text-md">
            <span>De {formatCurrency(originalPrice)}</span>{" "}
            <span>
              por{" "}
              <b className="text-gray-900">{formatCurrency(currentPrice)}</b>
            </span>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          Personal Data
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          Payment Method
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          Resume
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          CTA
        </section>
      </main>
    </div>
  );
}
