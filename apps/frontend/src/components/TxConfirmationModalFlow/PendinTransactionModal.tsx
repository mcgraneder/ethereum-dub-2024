import { UilSpinner } from "@iconscout/react-unicons";
import { Chain } from "~/utils/chainColours";
// import { FormWrapper } from "./TransactionConfirmationModal/TransactionConfirmationModal";
import { TopRowNavigation, FormWrapper } from "./index";

interface PendingTransactionModalProps {
  close: () => void;
  open: boolean;
  text: string;

  asset: any;
}

interface IconProps {
  active: boolean;
}

const PendingModalInner = ({
  close,
  text,

  chain,
  asset,
}: {
  close: () => void;
  text: string;
  chain: any;
  asset: any;
}) => {
  return (
    <>
      <TopRowNavigation isRightDisplay={true} close={close} />
      <div className="my-4 flex flex-col items-center justify-center  px-2">
        <UilSpinner className={"h-32 w-32 animate-spin text-blue-500"} />
      </div>
      <div className="my-2 flex flex-col items-center gap-[6px]">
        <span className=" text-[18px] font-semibold">
          Waiting For Confirmation
        </span>
        <span className="text-center text-[17px]">{`Swapping ${text} ${asset.Icon} on ${chain.fullName}`}</span>
        <span className="text-center text-[14px] text-gray-500">
          Confirm this transaction in your wallet
        </span>
      </div>
    </>
  );
};

function PendingTransactionModal({
  close,
  open,
  text,
  asset,
}: PendingTransactionModalProps) {
  const chain = Chain.Ethereum;

  return (
    <FormWrapper>
      <PendingModalInner
        close={close}
        text={text}
        chain={chain}
        asset={asset}
      />
    </FormWrapper>
  );
}

export default PendingTransactionModal;
