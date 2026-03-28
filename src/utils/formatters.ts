// ✅ SAFE DATE FORMATTER (FIXED)
export const formatDate = (dateString: string | number | null | undefined): string => {
  if (!dateString) return "No Date";

  const d = new Date(dateString);

  // ❗ handle invalid date
  if (isNaN(d.getTime())) return "No Date";

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// ✅ Currency formatter
export const formatCurrency = (amount: number | undefined): string => {
  if (!amount) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

// ✅ Indian numbering system (1,00,000)
export const formatIndianNumber = (num: number): string => {
  const numStr = Math.round(num).toString();
  const isNegative = numStr.startsWith('-');
  const absNumStr = isNegative ? numStr.slice(1) : numStr;
  
  if (absNumStr.length <= 3) {
    return isNegative ? `-${absNumStr}` : absNumStr;
  }
  
  let result = absNumStr.slice(-3);
  let remaining = absNumStr.slice(0, -3);
  
  while (remaining.length > 0) {
    const chunk = remaining.slice(-2);
    result = chunk + ',' + result;
    remaining = remaining.slice(0, -2);
  }
  
  return isNegative ? `-${result}` : result;
};

// ✅ Western numbering system (1,000,000)
export const formatWesternNumber = (num: number): string => {
  return Math.round(num).toLocaleString('en-US');
};

// ✅ Format based on currency
export const formatNumberByCurrency = (amount: number, currency: string): string => {
  if (currency === 'INR') {
    return formatIndianNumber(amount);
  }
  return formatWesternNumber(amount);
};

// ✅ Days until deadline (SAFE)
export const daysUntilDeadline = (deadline: string | null | undefined): number => {
  if (!deadline) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(deadline);

  if (isNaN(deadlineDate.getTime())) return 0;

  deadlineDate.setHours(0, 0, 0, 0);

  return Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
};

// ✅ Near deadline
export const isDeadlineNear = (deadline: string | null | undefined, days: number = 7): boolean => {
  const daysLeft = daysUntilDeadline(deadline);
  return daysLeft <= days && daysLeft > 0;
};

// ✅ Overdue
export const isOverdue = (deadline: string | null | undefined): boolean => {
  return daysUntilDeadline(deadline) < 0;
};