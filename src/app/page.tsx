"use client";
import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoaderCircle, LuCircleCheck } from "react-icons/lu";
import { Input, Label } from "@/components/ui";
import { MOCK_COURSE, INSTALLMENT_OPTIONS } from "@/constants";
import { cn, checkoutFormSchema } from "@/lib";
import {
  formatCurrency,
  formatCpf,
  formatPercentage,
  calculateTaxes,
} from "@/utils";
import type { CheckoutFormData } from "@/types";

export default function Home() {
  const { name, originalPrice, currentPrice } = MOCK_COURSE;
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "all",
    defaultValues: {
      email: "",
      cpf: "",
      paymentMethod: "pix",
      installment: 1,
    },
  });

  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const installment = useWatch({ control, name: "installment" });

  const summary = useMemo(
    () => calculateTaxes(currentPrice, paymentMethod, installment),
    [currentPrice, paymentMethod, installment],
  );
  const pixSavings = useMemo(
    () => calculateTaxes(currentPrice, "card", installment).platformTaxTotal,
    [currentPrice, installment],
  );

  const onSubmit = async () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 font-sans">
        <main className="mx-auto flex w-full max-w-md flex-col gap-4 px-4">
          <section className="flex flex-col items-center gap-3 rounded-lg bg-white p-4 text-center shadow-md">
            <LuCircleCheck className="size-12 text-green-700" />
            <span className="text-2xl font-bold text-gray-900">
              Compra finalizada com sucesso!
            </span>
            <span className="text-sm text-gray-500">
              Enviamos os detalhes de{" "}
              <span className="font-medium">{name}</span> para{" "}
              {getValues("email")}.
            </span>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 font-sans">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <main className="mx-auto flex w-full max-w-md flex-col gap-4 px-4">
          <section className="flex flex-col justify-center gap-2 rounded-lg bg-white p-4 shadow-md">
            <h1 className="text-xl font-bold">{name}</h1>
            <div className="text-md text-gray-500">
              <span>De {formatCurrency(originalPrice)}</span>{" "}
              <span>
                por{" "}
                <b className="text-gray-900">{formatCurrency(currentPrice)}</b>
              </span>
            </div>
          </section>

          <section className="flex flex-col justify-center gap-4 rounded-lg bg-white p-4 shadow-md">
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
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  disabled={isSubmitting}
                  className="w-full rounded border border-gray-400 px-3 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <Label
                  htmlFor="cpf"
                  className="absolute -top-2 left-2.5 bg-white px-1 text-xs text-gray-500"
                >
                  CPF
                </Label>
                <Controller
                  control={control}
                  name="cpf"
                  render={({ field }) => (
                    <Input
                      id="cpf"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="000.000.000-00"
                      maxLength={14}
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(formatCpf(e.target.value))
                      }
                      onBlur={field.onBlur}
                      aria-invalid={Boolean(errors.cpf)}
                      disabled={isSubmitting}
                      className="w-full rounded border border-gray-400 px-3 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  )}
                />
                {errors.cpf && (
                  <span className="text-xs text-red-500">
                    {errors.cpf.message}
                  </span>
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-center gap-1 rounded-lg bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold text-blue-400">Pagamento</h2>
            <div className="flex flex-col gap-2">
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md border border-transparent px-3 py-3",
                  paymentMethod === "pix" && "border-green-500 bg-green-50/50",
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "pix"}
                  onChange={() => setValue("paymentMethod", "pix")}
                  disabled={isSubmitting}
                  className="size-4 accent-blue-600"
                />
                <span className="text-sm text-gray-900">PIX (Taxa 0% 🔥)</span>
              </label>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md border border-transparent px-3 py-3",
                  paymentMethod === "card" && "border-green-500 bg-green-50/50",
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setValue("paymentMethod", "card")}
                  disabled={isSubmitting}
                  className="size-4 accent-blue-600"
                />
                <span className="text-sm text-gray-900">Cartão</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="relative mt-1">
                <Label
                  htmlFor="installment"
                  className="absolute -top-2 left-2.5 bg-white px-1 text-xs text-gray-500"
                >
                  Parcelas
                </Label>
                <select
                  id="installment"
                  value={installment}
                  disabled={isSubmitting}
                  onChange={(e) =>
                    setValue("installment", Number(e.target.value))
                  }
                  className="w-full rounded border border-gray-400 px-3 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  {INSTALLMENT_OPTIONS.map((option: number) => {
                    const optionTaxes = calculateTaxes(
                      currentPrice,
                      "card",
                      option,
                    );
                    return (
                      <option key={option} value={option}>
                        {option}x de{" "}
                        {formatCurrency(optionTaxes.installmentValue)}
                        {option > 1
                          ? ` (total de ${formatCurrency(optionTaxes.buyerTotal)})`
                          : " (à vista)"}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </section>

          <section className="flex flex-col justify-center gap-3 rounded-lg bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Resumo da compra</h2>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500">Valor do produto</span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(currentPrice)}
              </span>
            </div>
            {summary.buyerTaxTotal > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-500">
                  Taxa de parcelamento ({formatPercentage(summary.buyerTaxRate)}
                  )
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(summary.buyerTaxTotal)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500">Total do comprador</span>
              <span className="text-base font-bold text-gray-900">
                {formatCurrency(summary.buyerTotal)}
              </span>
            </div>
            {paymentMethod === "card" && summary.installment > 1 && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-500">Parcelamento</span>
                <span className="text-sm font-medium text-gray-900">
                  {summary.installment}x de{" "}
                  {formatCurrency(summary.installmentValue)}
                </span>
              </div>
            )}
            <hr className="border-gray-200" />
            <span className="text-sm font-medium text-gray-500">
              Repasse do criador
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500">
                Taxa Cakto ({formatPercentage(summary.platformTaxRate)})
              </span>
              <span className="text-sm font-medium text-gray-900">
                - {formatCurrency(summary.platformTaxTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500">
                Valor líquido do criador
              </span>
              <span className="text-base font-bold text-gray-900">
                {formatCurrency(summary.producerNet)}
              </span>
            </div>
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
              {paymentMethod === "pix"
                ? `Escolhendo o Pix, ${formatCurrency(pixSavings)} é economizado pelo criador em relação ao Cartão de Crédito (${installment}x).`
                : `Economia do criador é de ${formatCurrency(pixSavings)} ao escolher Pix.`}
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-green-700 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LuLoaderCircle className="size-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Finalizar Compra"
            )}
          </button>
        </main>
      </form>
    </div>
  );
}
