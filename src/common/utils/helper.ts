export const normalizePhone = (phone: string) => {
  if (phone.startsWith('0')) {
    return '+62' + phone.slice(1);
  }
  return phone;
};
