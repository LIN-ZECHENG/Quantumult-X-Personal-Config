/* 菜鸟首页精简：移除包裹列表上方的搜索与快捷入口。 */

try {
  const body = JSON.parse($response.body);
  const pageData = body?.data?.data;
  const homeData = pageData?.data;

  if (homeData) {
    delete homeData.mainSearch;
    delete homeData.operationList;
  }

  if (pageData) {
    delete pageData.modalList;
    delete pageData["2242"];
    delete pageData["2247"];
    delete pageData["2248"];
  }

  $done({ body: JSON.stringify(body) });
} catch (_) {
  $done({ body: $response.body });
}
