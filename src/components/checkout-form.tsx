"use client";
import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPix } from "react-icons/fa6";
import { LuCircleCheck, LuCreditCard, LuLoaderCircle } from "react-icons/lu";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Input,
  Label,
  Separator,
} from "@/components/ui";
import type { Course, CheckoutFormData } from "@/types";
import { cn, checkoutFormSchema } from "@/lib";
import {
  formatPercentage,
  formatCurrency,
  formatCpf,
  calculateTaxes,
} from "@/utils";
import { INSTALLMENT_OPTIONS } from "@/constants";

const SummaryRow = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span
      className={cn(
        "text-sm font-medium text-gray-900 dark:text-white",
        highlight && "text-base font-bold",
      )}
    >
      {value}
    </span>
  </div>
);

export const CheckoutForm = ({ course }: { course: Course }) => {
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
    () => calculateTaxes(course.currentPrice, paymentMethod, installment),
    [course.currentPrice, paymentMethod, installment],
  );
  const cardComparison = useMemo(
    () => calculateTaxes(course.currentPrice, "card", installment),
    [course.currentPrice, installment],
  );
  const pixSavings = cardComparison.platformTaxTotal;

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Card className="mx-auto w-full max-w-md p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <LuCircleCheck className="size-12 text-[#1D7A4A]" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Compra finalizada com sucesso!
          </span>
          <span className="text-sm text-muted-foreground">
            Enviamos os detalhes do pedido de{" "}
            <span className="font-medium">{course.name}</span> para{" "}
            {getValues("email")}.
          </span>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Card className="mx-auto grid w-full max-w-4xl gap-6 p-4 sm:p-6 md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Checkout
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Curso:
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {course.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                  {formatCurrency(course.originalPrice)}
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(course.currentPrice)}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="seuemail@exemplo.com"
              aria-invalid={Boolean(errors.email)}
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="cpf">CPF</Label>
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
                  onChange={(event) =>
                    field.onChange(formatCpf(event.target.value))
                  }
                  onBlur={field.onBlur}
                  aria-invalid={Boolean(errors.cpf)}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.cpf && (
              <span className="text-sm text-destructive">
                {errors.cpf.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Pague com:
            </span>
            <ButtonGroup className="w-full *:flex-1">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isSubmitting}
                onClick={() => setValue("paymentMethod", "pix")}
                aria-pressed={paymentMethod === "pix"}
                className={cn(
                  "h-12 border-[#1D7A4A] text-[#1D7A4A]",
                  paymentMethod === "pix" &&
                    "bg-[#1D7A4A] text-white hover:bg-[#1D7A4A] hover:text-white",
                )}
              >
                <FaPix className="size-4" />
                Pix
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[#1D7A4A]",
                    paymentMethod === "pix" && "bg-white",
                  )}
                >
                  0% de taxa
                </Badge>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isSubmitting}
                onClick={() => setValue("paymentMethod", "card")}
                aria-pressed={paymentMethod === "card"}
                className={cn(
                  "h-12",
                  paymentMethod === "card" &&
                    "bg-muted text-foreground dark:bg-input/30",
                )}
              >
                <LuCreditCard className="size-4" />
                Cartão de Crédito
              </Button>
            </ButtonGroup>
            {paymentMethod === "card" && (
              <span className="text-sm text-[#1D7A4A]">
                Pagando com Pix, o criador recebe {formatCurrency(pixSavings)} a
                mais.
              </span>
            )}
          </div>

          {paymentMethod === "card" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="installment">Parcelas</Label>
              <select
                id="installment"
                value={installment}
                disabled={isSubmitting}
                onChange={(event) =>
                  setValue("installment", Number(event.target.value))
                }
                className="h-9 w-full rounded-2xl border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
              >
                {INSTALLMENT_OPTIONS.map((option: number) => {
                  const optionTaxes = calculateTaxes(
                    course.currentPrice,
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
        </div>

        <div className="flex h-fit flex-col gap-3 rounded-2xl bg-muted/50 p-4">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Resumo da compra
          </span>
          <SummaryRow
            label="Valor do produto"
            value={formatCurrency(course.currentPrice)}
          />
          {summary.buyerTaxTotal > 0 && (
            <SummaryRow
              label={`Taxa de parcelamento (${formatPercentage(summary.buyerTaxRate)})`}
              value={formatCurrency(summary.buyerTaxTotal)}
            />
          )}
          <SummaryRow
            label="Total do comprador"
            value={formatCurrency(summary.buyerTotal)}
            highlight
          />
          {paymentMethod === "card" && summary.installment > 1 && (
            <SummaryRow
              label="Parcelamento"
              value={`${summary.installment}x de ${formatCurrency(summary.installmentValue)}`}
            />
          )}
          <Separator />
          <span className="text-sm font-medium text-muted-foreground">
            Repasse do criador
          </span>
          <SummaryRow
            label={`Taxa Cakto (${formatPercentage(summary.platformTaxRate)})`}
            value={`- ${formatCurrency(summary.platformTaxTotal)}`}
          />
          <SummaryRow
            label="Valor líquido do criador"
            value={formatCurrency(summary.producerNet)}
            highlight
          />
          <div className="rounded-2xl bg-[#1D7A4A]/10 p-3 text-sm text-[#1D7A4A]">
            {paymentMethod === "pix"
              ? `Escolhendo o Pix, ${formatCurrency(pixSavings)} é economizado pelo criador em relação ao Cartão de Crédito (${installment}x).`
              : `Economia do criador é de ${formatCurrency(pixSavings)} ao escolher Pix.`}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-12 w-full bg-[#1D7A4A] text-white hover:bg-[#1D7A4A]"
          >
            {isSubmitting ? (
              <>
                <LuLoaderCircle className="size-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Finalizar Compra"
            )}
          </Button>
        </div>
      </Card>
    </form>
  );
};
