import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { CounterContract } from "./counterContract";

export default function Counter() {
  const { data, isError, isLoading } = useContractRead({
    address: CounterContract.address,
    abi: CounterContract.abi,
    functionName: "number",
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div>Error</div>}
      {!isLoading && !isError && (
        <div>Counter: {BigNumber.from(data).toString()}</div>
      )}
    </div>
  );
}
