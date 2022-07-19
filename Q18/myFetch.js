//simulation of fetch
import candidates from "./candidates";

async function myFetch(fakeURL, config = {}) {
  const { method = "GET", body, headers } = config;

  let resolvedData;
  let resolvedStatus;
  if (method == "GET" || method == "get") {
    resolvedData = candidates;
    resolvedStatus = "200";
  }

  if (method == "POST" || method == "post") {
    resolvedData = body;
  }

  return Promise.resolve(
    JSON.stringify({ data: resolvedData, statusCode: resolvedStatus })
  );
}
