export type CalculateTaxResult = {
  installment: number;
  installmentValue: number;
  buyerTaxRate: number;
  buyerTaxTotal: number;
  buyerTotal: number;
  platformTaxRate: number;
  platformTaxTotal: number;
  producerNet: number;
};
