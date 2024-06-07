import React from "react";
import styled, { css } from "styled-components";
import { UilTimes, UilArrowLeft } from "@iconscout/react-unicons";
import { useTransactionFlow } from "~/context/useTransactionFlowState";
import PendingTransactionModal from "./PendinTransactionModal";
import TransactionRejectedModal from "./TransactionRejectedModal";

export const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  pointer-events: none;
  backdrop-filter: blur(5px);
  z-index: 1000;
  pointer-events: none;
  transition: opacity 0.15s ease-in-out !important;
  background: rgba(2, 8, 26, 0.45);
  ${(props: any) =>
    props.visible &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`;

export const FormWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 430px;
  background-color: rgb(13, 17, 28);
  text-align: right;
  padding: 30px 15px;
  padding-bottom: 20px;
  border: 1.5px solid rgb(60, 65, 80);
  border-radius: 15px;
  display: block;
  z-index: 10000000000;

  box-shadow: 14px 19px 5px 0px rgba(0, 0, 0, 0.85);
  color: white;
`;

interface ITopRow {
  isLeftDisplay?: boolean;
  isRightDisplay?: boolean;
  backFunction?: () => void;
  close?: () => void;
  title?: string;
}

export const TopRowNavigation = ({
  isLeftDisplay = false,
  isRightDisplay = false,
  backFunction = () => {},
  close = () => {},
  title = "",
}: ITopRow) => {
  return (
    <div
      className={`mb-2 flex items-center ${
        isRightDisplay && !isLeftDisplay ? "justify-end" : "justify-between"
      } px-2`}
    >
      {isLeftDisplay && (
        <div onClick={backFunction}>
          {title === "" ? (
            <UilArrowLeft className={" hover:cursor-pointer"} />
          ) : (
            <span className="text-[17px] font-semibold">{title}</span>
          )}
        </div>
      )}
      {isRightDisplay && (
        <div onClick={close}>
          <UilTimes className={" hover:cursor-pointer"} />
        </div>
      )}
    </div>
  );
};

interface TxFlowProps {
  text: string;
  asset: any;
  setText: any;
}

function TransactionFlowModals({ text, asset, setText }: TxFlowProps) {
  const {
    pending,
    togglePendingModal,
    toggleRejectedModal,
    rejected,
    confirmation,
    toggleConfirmationModal,
    submitted,
  } = useTransactionFlow();

  return (
    <>
      <Backdrop visible={confirmation || pending || rejected || submitted}>
        {pending && (
          <PendingTransactionModal
            close={togglePendingModal}
            open={pending}
            text={text}
            asset={asset}
          />
        )}

        {rejected && (
          <TransactionRejectedModal
            close={toggleRejectedModal}
            open={rejected}
          />
        )}
      </Backdrop>
    </>
  );
}

export default TransactionFlowModals;
