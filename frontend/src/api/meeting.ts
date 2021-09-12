export interface meeting {
    title: string,
    availability: availability[],
    by_end_date: string,
    meeting_id: string,
}

export interface availability {
    name: string,
    slots: number[]
}

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

export const createMeeting = async (title: string, by_end_date: string) => {
    const date = new Date(by_end_date).toISOString().substring(0, 10);
    const body = JSON.stringify({ title: title, by_end_date: date });
    const requestOptions = {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: body,    
    }
    const response = await fetch("/api/v1/meetings/", requestOptions);
    return await response.json();
}

export const postNewUser = async ( meeting_id: string, name: string) => {
    const requestOptions = {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name }),
    }
    const response = await fetch(`/api/v1/meetings/${meeting_id}/availabilities/`, requestOptions);
    return await response.json();
}

export const postAvailability = async ( meeting_id: string, name: string, slots: number[]) => {
    const requestOptions = {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, slots: `[${slots}]` }),
    }
    const response = await fetch(`/api/v1/meetings/${meeting_id}/availabilities/`, requestOptions);
    return await response.json();
}