import { useEffect, useRef, useState } from "react";
import "./AvailableNFts.css";
import NFT from "./NFT";
import Modal from "./UI/Modal";
import { fetchAllData, fetchUserData, updateData } from "../backend/web/http";
import RemoveModal from "./UI/RemoveModal";

const AvailableNFTs = () => {
  const [appError, setAppError] = useState();
  const [fetchedData, setFetchedData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [needForModal, setNeedForModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const dataFetched = await fetchAllData();
      setFetchedData(dataFetched);
      setIsFetching(false);
    };

    async function fetchUserSelectData() {
      try {
        const fetchedUserData = await fetchUserData();
        setUserData(fetchedUserData);
      } catch (error) {
        setAppError(true);
        throw new Error({ message: "Unable to fetch UserData" });
      }
    }
    fetchData();
    fetchUserSelectData();
  }, []);

  const onClickhandler = async (data) => {
    const selectedData = fetchedData.find((item) => data.dest === item.id);
    setUserData((prevData) => {
      if (!prevData) {
        prevData = [];
      } else if (prevData.some((item) => item.id === selectedData.id)) {
        return prevData;
      }
      return [selectedData, ...prevData];
    });

    try {
      await updateData(JSON.stringify({ places: [selectedData, ...userData] }));
    } catch (error) {
      setAppError(true);
      throw new Error({ message: error.message });
    }
  };

  const onCloseModalHandler = (option) => {};

  const onRemoveHandler = async (choice) => {
    const requestedDataToRemove = userData.find(
      (nft) => needForModal.data.dest === nft.id
    ); // What Data.
    if (choice) {
      const updateUserData = userData.filter(
        (nft) => nft.id !== requestedDataToRemove.id
      );
      setUserData(updateUserData);
      await updateData(JSON.stringify({ places: updateUserData }));
    }
    setNeedForModal(false);
  };

  const onUserChoice = (data) => {
    setNeedForModal({
      title: "Are you sure?",
      message: `Remove ${data.name}?`,
      data,
    });
  };

  return (
    <>
      {needForModal && (
        <RemoveModal
          onClick={onRemoveHandler}
          title={needForModal.title}
          message={needForModal.message}
        ></RemoveModal>
      )}
      {appError && (
        <Modal
          onClickHandler={onCloseModalHandler}
          title="Error"
          message={appError.message || "Unexplained Error"}
        />
      )}
      {!appError && (
        <div className="container mt-4">
          {userData.length > 0 && (
            <>
              <h2 className="text-secondary mb-4">User's NFTs</h2>
              <div className="d-flex flex-wrap user-nfts">
                {userData.map((nft) => (
                  <NFT
                    onClick={onUserChoice}
                    key={nft.id}
                    name={nft.name}
                    dest={nft.id}
                    desc={nft.desc}
                  />
                ))}
              </div>
            </>
          )}

          <h2 className="text-secondary mb-4">Available NFTs</h2>
          <div className="d-flex flex-wrap">
            {isFetching && <p className="text-secondary">Loading NFTs...</p>}
            {fetchedData.map((nft) => (
              <NFT
                onClick={onClickhandler}
                key={nft.id}
                name={nft.name}
                dest={nft.id}
                desc={nft.desc}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AvailableNFTs;
