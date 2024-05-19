export const useCustomer = () => {
  const customerName = useState("customerName", () => "");
  const hasNameError = computed(() => {
    return customerName.value.length < 2;
  });
  const customerInitials = computed(() => {
    const names = customerName.value.split(" ");
    if (names.length < 2)
      return customerName.value.substring(0, 2).toUpperCase();
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  });

  return {
    customerName,
    hasNameError,
    customerInitials,
  };
};
