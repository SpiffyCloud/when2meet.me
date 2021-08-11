export const fetchMeeting = async (id: string) => {
    const requestOptions = {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            };
    const response = await fetch(`/api/v1/meetings/${id}`, requestOptions);
    if (response.status === 200) {
        return await response.json();
    }
    throw new Error("Bad response from server");
}