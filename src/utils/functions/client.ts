// client functions are used for some cases that requires "use client"

"use client";

// helpers
export const extractImageLinksFromHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return Array.from(doc.querySelectorAll("img")).map((img) => img.src);
};

// fetch funcs
export const handleAdd = async (data: any, url: string) => {
  // console.log("datadatadata", JSON.stringify(data));
  // console.log("urlurlurlurl", url);
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    const resData = await res.json();
    // console.log("ressssss", resData.status);

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

export const handleDelete = async (
  ids: string[],
  deleteUrl: string
): Promise<boolean> => {
  try {
    const res = await fetch(deleteUrl, {
      method: "DELETE",
      body: JSON.stringify({ ids: ids }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status != 200 && res.status != 201) return false;
    return true;
  } catch (error) {
    return false;
  }
};
