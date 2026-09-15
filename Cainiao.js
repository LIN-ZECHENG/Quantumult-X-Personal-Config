/* 菜鸟首页精简：保留取件内容，移除搜索、其他快捷入口及整个底栏。 */

const PICKUP_MARKERS = ["pick_up", "pickup_page_native"];

function containsPickup(value) {
  try {
    const text = JSON.stringify(value).toLowerCase();
    return PICKUP_MARKERS.some((marker) => text.includes(marker));
  } catch (_) {
    return false;
  }
}

function keepPickupOnly(value) {
  if (Array.isArray(value)) {
    const processed = value.map(keepPickupOnly);
    return processed.some(containsPickup)
      ? processed.filter(containsPickup)
      : processed;
  }

  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      value[key] = keepPickupOnly(value[key]);
    }
  }

  return value;
}

try {
  const body = JSON.parse($response.body);
  const pageData = body?.data?.data;
  const homeData = pageData?.data;

  if (homeData) {
    delete homeData.mainSearch;
    if (homeData.operationList) {
      homeData.operationList = keepPickupOnly(homeData.operationList);
    }
  }

  if (pageData) {
    delete pageData.modalList;
    delete pageData["2242"];
    delete pageData["2247"];
    delete pageData["2248"];
    delete pageData["2240"];
    delete pageData["2249"];
  }

  $done({ body: JSON.stringify(body) });
} catch (_) {
  $done({ body: $response.body });
}
