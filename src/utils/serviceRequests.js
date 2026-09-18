// ==========================================
// SERVICE REQUEST STORAGE
// ==========================================

const REQUEST_KEY = "serviceRequests";


// ==========================================
// GET ALL REQUESTS
// ==========================================

export const getServiceRequests = () => {
  try {
    const requests =
      localStorage.getItem(REQUEST_KEY);

    return requests
      ? JSON.parse(requests)
      : [];

  } catch (error) {

    console.error(
      "Error reading service requests:",
      error
    );

    return [];
  }
};


// ==========================================
// ADD NEW REQUEST
// ==========================================

export const addServiceRequest = (requestData) => {

  const existingRequests =
    getServiceRequests();

  const newRequest = {

    id:
      Date.now().toString(),

    ...requestData,

    status: "Pending",

    createdAt:
      new Date().toISOString(),
  };


  const updatedRequests = [
    ...existingRequests,
    newRequest,
  ];


  localStorage.setItem(
    REQUEST_KEY,
    JSON.stringify(updatedRequests)
  );


  return newRequest;
};


// ==========================================
// UPDATE REQUEST STATUS
// ==========================================

export const updateServiceRequestStatus = (
  requestId,
  status
) => {

  const requests =
    getServiceRequests();


  const updatedRequests =
    requests.map((request) => {

      if (request.id === requestId) {

        return {
          ...request,
          status,
        };

      }

      return request;
    });


  localStorage.setItem(
    REQUEST_KEY,
    JSON.stringify(updatedRequests)
  );


  return updatedRequests;
};


// ==========================================
// DELETE REQUEST
// ==========================================

export const deleteServiceRequest = (
  requestId
) => {

  const requests =
    getServiceRequests();


  const updatedRequests =
    requests.filter(
      (request) =>
        request.id !== requestId
    );


  localStorage.setItem(
    REQUEST_KEY,
    JSON.stringify(updatedRequests)
  );


  return updatedRequests;
};