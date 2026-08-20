import {
  ADM_TAX_MULTIPLE_INSTALLMENTS,
  CAKTO_TAX_MULTIPLE_INSTALLMENTS,
  CAKTO_TAX_ONE_INSTALLMENT,
  CAKTO_TAX_PIX,
} from "@/constants";
import type { PaymentMethod, CalculateTaxResult } from "@/types";

export const calculateTaxes = (
  price: number,
  method: PaymentMethod,
  installments: number,
): CalculateTaxResult => {
  if (method === "pix") {
    return {
      installment: 1,
      installmentValue: price,
      buyerTaxRate: 0,
      buyerTaxTotal: 0,
      buyerTotal: price,
      platformTaxRate: CAKTO_TAX_PIX,
      platformTaxTotal: price * CAKTO_TAX_PIX,
      producerNet: price - price * CAKTO_TAX_PIX,
    };
  }

  const platformTaxRate =
    installments === 1
      ? CAKTO_TAX_ONE_INSTALLMENT
      : CAKTO_TAX_MULTIPLE_INSTALLMENTS;

  const buyerTaxRate =
    installments > 1 ? ADM_TAX_MULTIPLE_INSTALLMENTS * (installments - 1) : 0;

  const buyerTaxTotal = price * buyerTaxRate;
  const buyerTotal = price + buyerTaxTotal;
  const platformTaxTotal = price * platformTaxRate;

  return {
    installment: installments,
    installmentValue: buyerTotal / installments,
    buyerTaxRate,
    buyerTaxTotal,
    buyerTotal,
    platformTaxRate,
    platformTaxTotal,
    producerNet: price - platformTaxTotal,
  };
};
