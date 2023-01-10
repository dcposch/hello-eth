export const CounterContract = {
  address: "0xc31495cb215f905e4d10737d30b7be2548731ee8",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "function",
      name: "increment",
    },
    {
      inputs: [],
      stateMutability: "view",
      type: "function",
      name: "number",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
    },
  ],
};
