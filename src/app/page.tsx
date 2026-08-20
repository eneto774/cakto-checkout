import { Input, Label } from "@/components/ui";
import { MOCK_COURSE } from "@/constants";
import { formatCurrency } from "@/utils";

export default async function Home() {
  const { name, originalPrice, currentPrice } = MOCK_COURSE;
  return (
    <div className="min-h-screen bg-gray-100 py-6 font-sans">
      <main className="mx-auto flex w-full max-w-md flex-col gap-4 px-4">
        <section className="flex flex-col justify-center gap-2 rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-xl font-bold">{name}</h1>
          <div className="text-gray-500 text-md">
            <span>De {formatCurrency(originalPrice)}</span>{" "}
            <span>
              por{" "}
              <b className="text-gray-900">{formatCurrency(currentPrice)}</b>
            </span>
          </div>
        </section>
        <section className="flex flex-col justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-lg font-bold">Dados Pessoais</h2>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Label
                htmlFor="email"
                className="absolute -top-2 left-2.5 bg-white px-1 text-xs text-gray-500"
              >
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                className="w-full rounded border border-gray-400 px-3 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="relative">
              <Label
                htmlFor="cpf"
                className="absolute -top-2 left-2.5 bg-white px-1 text-xs text-gray-500"
              >
                CPF
              </Label>
              <Input
                id="cpf"
                type="text"
                className="w-full rounded border border-gray-400 px-3 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
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
