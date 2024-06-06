import React, { useState, useCallback } from "react";
import {
  FormWrapper,
  TokenInputContainer,
  TokenInput,
} from "../CSS/AssetListModalStyles";
import { Icon } from "../Icons/AssetLogs/Icon";

import { assetsConfig, type AssetConfig } from "../../utils/assetsConfig";
import { Asset } from "~/utils/chainColours";
import { UilTimes } from "@iconscout/react-unicons";
import styled, { css } from "styled-components";

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
const getOptions = (): Array<AssetConfig> => {
  return Object.values(assetsConfig);
};

interface IAssetModal {
  setShowTokenModal: any;
  visible: boolean;
  setAsset: any;
  assetFilter: Asset[];
}

const createAvailabilityFilter =
  (available: Array<Asset>) => (option: AssetConfig) => {
    if (!available) {
      return true;
    }
    return (available as Asset[]).includes(option.Icon as Asset);
  };

const AssetListModal = ({
  setShowTokenModal,
  visible,
  setAsset,
  assetFilter,
}: IAssetModal) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const close = useCallback((): void => {
    setShowTokenModal(false);
    setSearchTerm("");
  }, [setShowTokenModal]);

  const available = useCallback(() => [...assetFilter], [assetFilter]);

  const availabilityFilter = React.useMemo(
    () => createAvailabilityFilter(available()),
    [available],
  );

  const handleSearch = (val: any) => {
    if (!val) return;
    return (
      searchTerm === "" ||
      val.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const setSelectedToken = React.useCallback(
    (option: any) => {
      setAsset(option);
      console.log(option);
      setSearchTerm("");
      close();
    },
    [close, setAsset],
  );

  const handleCurrencyChange = useCallback(
    (option: Partial<AssetConfig>): void => {
      setSelectedToken(option);
      setShowTokenModal(false);
    },
    [setSelectedToken, setShowTokenModal],
  );
  return (
    <Backdrop visible={visible}>
      <FormWrapper>
        <div className="border-tertiary border-b px-[25px] pb-[15px] pt-[30px]">
          <div className={"mb-2 flex items-center justify-between px-2"}>
            <div>
              <span className="text-[17px] font-semibold">
                {"Select a Currency"}
              </span>
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div onClick={close}>
              <UilTimes className={" hover:cursor-pointer"} />
            </div>
          </div>
          <TokenInputContainer>
            <TokenInput
              placeholder={"Search Currency by name or symbol"}
              value={searchTerm}
              name={"search"}
              type={"text"}
              onChange={(e: any) => setSearchTerm(e.currentTarget.value)}
            />
          </TokenInputContainer>
          <div className="my-2 flex flex-row items-center justify-start gap-2">
            <div className="border-tertiary bg-secondary flex items-center justify-center gap-1 rounded-xl border  p-2">
              <Icon chainName={assetFilter[0] ?? "CAKE"} className="h-6 w-6" />
              <span className="mx-1">{assetFilter[0]}</span>
            </div>
          </div>
        </div>
        <div className=" bg-extraDarkBackground max-h-[287px] min-h-[287px] overflow-y-auto">
          {getOptions()
            .filter(availabilityFilter)
            .filter((val) => {
              return handleSearch(val);
            })

            .map((asset: Partial<AssetConfig>, index: number) => {
              const isDisabled = asset.shortName !== "CAKE";
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className={`cursor: pointer hover:bg-secondary flex items-center justify-between px-8 py-[10px] hover:cursor-pointer ${isDisabled ? "pointer-none" : ""}`}
                  onClick={() => handleCurrencyChange(asset)}
                >
                  <div className="flex items-center justify-center gap-4">
                    <Icon
                      chainName={asset.Icon as string}
                      className="h-8 w-8"
                    />
                    <div className="flex flex-col items-start justify-start text-center">
                      <span className="text-[16px] font-semibold leading-tight">
                        {asset.fullName}
                      </span>
                      <span className="text-[14px] leading-tight text-gray-500">
                        {asset.shortName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="border-tertiary border-t px-[25px] py-[20px] text-center">
          <span className="text-center text-[17px] font-semibold text-blue-500">
            Currency selection
          </span>
        </div>
      </FormWrapper>
    </Backdrop>
  );
};

export default AssetListModal;
