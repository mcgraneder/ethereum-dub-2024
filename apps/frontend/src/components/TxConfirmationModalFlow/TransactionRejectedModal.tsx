// import { FormWrapper } from "./TransactionConfirmationModal/TransactionConfirmationModal";

import { UilExclamationTriangle } from "@iconscout/react-unicons";
import { useAccount } from "wagmi";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { TopRowNavigation, FormWrapper } from "./index";

interface PendingTransactionModalProps {
  close: () => void;
  open: boolean;
}

interface IconProps {
  active: boolean;
}

const TransactionRejectedInner = ({
  active,
  close,
}: {
  active: boolean;
  close: () => void;
}) => {
  return (
    <>
      <TopRowNavigation
        isRightDisplay={true}
        isLeftDisplay={true}
        title={"Error"}
        close={close}
      />
      <div className="my-4 flex flex-col items-center justify-center  px-2">
        <UilExclamationTriangle className={"h-24 w-24 text-red-500"} />
      </div>
      <div className="my-2 flex flex-col items-center gap-2">
        <span className=" text-[18px] font-semibold">Transaction Rejected</span>
      </div>
      <div className="mb-2 mt-8 flex items-center justify-center">
        <PrimaryButton
          className={
            "w-full justify-center rounded-2xl bg-blue-500 py-[15.5px] text-center text-[17px] font-semibold"
          }
          onClick={close}
        >
          Close
        </PrimaryButton>
      </div>
    </>
  );
};

function TransactionRejectedModal({
  close,
  open,
}: PendingTransactionModalProps) {
  const { isConnected: active } = useAccount();

  return (
    <FormWrapper>
      <TransactionRejectedInner active={active} close={close} />
    </FormWrapper>
  );
}

export default TransactionRejectedModal;
