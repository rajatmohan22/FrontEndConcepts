export const fetchAllData = async()=>{
  try {
    const response = await fetch("http://localhost:3000/all-nft");
    if (!response.ok) {
      throw new Error({ message: "unable to fetch data" });
    }
    const JsonData = await response.json();
    return JsonData
  } catch (err) {
    throw new Error({message: "Unable to fetch data"})
  }
}

export const fetchUserData = async()=>{
    const fetchedData = await fetch("http://localhost:3000/user-nfts")
    if(!fetchedData.ok){
        throw new Error({message: "Cannot fetch data"})
    }
    const data = await fetchedData.json();
    console.log(data)
    return data
}

export const updateData = async (data) => {
  await fetch("http://localhost:3000/all-nft", {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
