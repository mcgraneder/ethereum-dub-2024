import React, { useState, useCallback } from "react";
import {
  UilExclamationTriangle,
  UilTimes,
  UilArrowLeft,
} from "@iconscout/react-unicons";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styled, { css } from "styled-components";
import Link from "next/link";

export const FormWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 630px;
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
  title?: JSX.Element | string;
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
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div onClick={backFunction}>
          {title === "" ? (
            <UilArrowLeft className={" hover:cursor-pointer"} />
          ) : (
            <span className="text-[17px] font-semibold">{title}</span>
          )}
        </div>
      )}
      {isRightDisplay && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div onClick={close}>
          <UilTimes className={" hover:cursor-pointer"} />
        </div>
      )}
    </div>
  );
};
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

interface PendingTransactionModalProps {
  close: () => void;
  open: boolean;
  message: JSX.Element;
  isHomePageWarning: boolean;
}

interface IconProps {
  active: boolean;
}

const SecondStep = ({ close }: { close: () => void }) => {
  return (
    <>
      <TopRowNavigation
        isRightDisplay={true}
        isLeftDisplay={true}
        close={close}
        title={"App Demo"}
      />

      <div className="my-4 flex flex-col items-center justify-center gap-2">
        <span className=" px-2 text-center text-[15px] text-gray-400">
          Since this App is in early stages of development i made a Demo &
          explanation video to show how to use the current available features
        </span>
      </div>
      <div className="aspect-w-16 aspect-h-9 mx-10 flex items-center justify-center p-2">
        <iframe
          width="560"
          height="315"
          src="https://youtu.be/v-LHx_rA62s"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="my-4 flex flex-col items-center justify-center gap-2">
        <span className=" px-2 text-center text-[15px] text-gray-400">
          In the video i give an explanation of how my app works/will work
          architecturally from the backend smart contract design as well as the
          server and API design
        </span>
        <br />
        <br />
        <span className=" px-2 text-center text-[15px] text-gray-400">
          if the video does not load please see it{" "}
          <Link
            className="bold text-blue-500"
            href="https://youtu.be/v-LHx_rA62s"
            referrerPolicy="no-referrer"
            target="_blank"
          >
            here
          </Link>
        </span>
      </div>
      <div className="mb-2 mt-8 flex items-center justify-center">
        <PrimaryButton
          className={
            "w-full justify-center rounded-2xl bg-blue-500 py-[15.5px] text-center text-[17px] font-semibold"
          }
          onClick={close}
        >
          {"Close"}
        </PrimaryButton>
      </div>
    </>
  );
};

const UserInfoModalInner = ({
  close,
  message,
  buttonTitle,
}: {
  close: () => void;
  message: JSX.Element;
  buttonTitle: string;
}) => {
  return (
    <>
      <TopRowNavigation
        isRightDisplay={true}
        isLeftDisplay={false}
        close={close}
      />

      <div className="my-4 flex flex-col items-center justify-center  px-2">
        <UilExclamationTriangle className={"h-24 w-24 text-red-500"} />
      </div>
      <div className="mx-auto my-2 flex max-w-[90%] flex-col items-center justify-center gap-2">
        <span className=" px-2 text-center text-[15px] text-gray-400">
          {message}
        </span>
      </div>
      <div className="mb-2 mt-8 flex items-center justify-center">
        <PrimaryButton
          className={
            "w-full justify-center rounded-2xl bg-blue-500 py-[15.5px] text-center text-[17px] font-semibold"
          }
          onClick={close}
        >
          {buttonTitle}
        </PrimaryButton>
      </div>
    </>
  );
};

function UserInfoModal({
  close,
  open,
  message,
  isHomePageWarning,
}: PendingTransactionModalProps) {
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
  const handleSecondStep = useCallback(
    () => setIsFirstStep((s: boolean) => !s),
    [],
  );
  return (
    <>
      <Backdrop visible={open}>
        <FormWrapper>
          <SecondStep close={close} />
        </FormWrapper>
      </Backdrop>
    </>
  );
}

export default UserInfoModal;
