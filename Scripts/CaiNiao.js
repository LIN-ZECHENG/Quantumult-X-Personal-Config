let body = $response.body;

try {
  const obj = JSON.parse(body);

  if (obj?.data?.data?.data) {
    delete obj.data.data.data.operationList;
  }

  if (obj?.data?.data) {
    delete obj.data.data["2242"];
    delete obj.data.data["2247"];
    delete obj.data.data["2248"];
  }

  body = JSON.stringify(obj);
} catch (e) {}

$done({ body });
