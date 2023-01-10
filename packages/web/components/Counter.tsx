import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { BigNumber } from "ethers";
import { useCallback } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CounterContract } from "./counterContract";

export default function Counter() {
  // Read the current counter value
  const { data, isError, isLoading, refetch } = useContractRead({
    address: CounterContract.address,
    abi: CounterContract.abi,
    functionName: "number",
  });

  // Get ready to increment the counter
  const { config } = usePrepareContractWrite({
    address: CounterContract.address,
    abi: CounterContract.abi,
    functionName: "increment",
  });

  // Once we do increment, add it to the RainbowKit recent transactions
  const addRecentTransaction = useAddRecentTransaction();
  const incrementSend = useContractWrite({
    ...config,
    onSuccess: (data) =>
      addRecentTransaction({
        hash: data.hash,
        description: "Incremented the counter",
      }),
    onSettled: () => refetch(),
  });
  const { status, write } = incrementSend;
  const isReadToWrite = !isLoading && !isError && write != null;

  // Finally, wait for the transaction to be confirmed (included in a block)
  const incrementConfirmed = useWaitForTransaction({
    hash: incrementSend.data?.hash,
    onSettled: () => refetch(), // Once that happens, reload the counter value
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div>Error</div>}
      {!isLoading && !isError && (
        <h2>
          <div>Counter {BigNumber.from(data).toString()}</div>
        </h2>
      )}

      <button
        disabled={!isReadToWrite}
        onClick={useCallback(() => write && write(), [write])}
      >
        Increment
      </button>

      <p>
        Send tx {status}
        <br />
        Confirm tx {incrementConfirmed.status}
      </p>
    </div>
  );
}
