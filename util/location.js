const MAP_QUEST_API_KEY = "CxIWtjUGVLOAjiV6G18o3vg4OzH1uq7m";
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${MAP_QUEST_API_KEY}&center=${lat},${lng}&locations=${lat},${lng}&zoom=14&size=@2x&defaultMarker=marker-red-lg&size=600,400@2x`;
  console.log(imagePreviewUrl);
  return imagePreviewUrl;
}
// https://www.mapquestapi.com/staticmap/v5/map?key=CxIWtjUGVLOAjiV6G18o3vg4OzH1uq7m&center=${lat},${lng}&zoom=14&size=@2x&defaultMarker=marker-sm-22407F-3B5998&size=600,400@
export async function getAddress(lat, lng) {
  const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${MAP_QUEST_API_KEY}&location=${lat},${lng}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }
  const data = await response.json();
  const dataResponse = data.results[0].locations;
  let address = "";
  if (dataResponse[0].street !== "") {
    address += dataResponse[0].street + ", ";
  }
  if (dataResponse[0].adminArea6 !== "") {
    address += dataResponse[0].adminArea6 + ", ";
  }
  if (dataResponse[0].adminArea5 !== "") {
    address += dataResponse[0].adminArea5 + ", ";
  }
  if (dataResponse[0].adminArea4 !== "") {
    address += dataResponse[0].adminArea4 + ", ";
  }
  if (dataResponse[0].adminArea3 !== "") {
    address += dataResponse[0].adminArea3 + ", ";
  }
  if (dataResponse[0].adminArea1 !== "") {
    address += dataResponse[0].adminArea1;
  }
  return address;
}
