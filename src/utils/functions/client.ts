// client functions are used for some cases that requires "use client"

"use client";

export const handleAdd = async (data: any, url: string) => {
  // console.log("datadatadata", JSON.stringify(data));
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const resData = await res.json();
    // console.log("ressssss", res.status);

    return {
      isSuccess: res.status == 200 || res.status == 201,
      _id: resData.data.id,
      err: "",
    };
  } catch (err) {
    console.log("errrrrrrrr", err);
    return { isSuccess: false, _id: "", err };
  }
};

export const handleUpdate = async (data: any, url: string) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { isSuccess: res.status == 200 || res.status == 201, err: "" };
  } catch (err) {
    console.log("errrrrrrrr", err);
    return { isSuccess: false, err };
  }
};
