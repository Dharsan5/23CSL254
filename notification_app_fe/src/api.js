import { Log } from 'logging_middleware';

const getAuthToken = () => localStorage.getItem("access_token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkaGFyc2Fuc3AuMjNjc2VAa29uZ3UuZWR1IiwiZXhwIjoxNzc5MDgzOTEyLCJpYXQiOjE3NzkwODMwMTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2M2RmYjFmMC0yZWNhLTQxOWMtOTk4MS1kY2EyYWQ3YTgxOTciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJkaGFyc2FuX3NwIiwic3ViIjoiZjM5MmZjZTQtZDI3OC00NTUwLTk5NTUtMGQ4OWQ0YTcwNDlmIn0sImVtYWlsIjoiZGhhcnNhbnNwLjIzY3NlQGtvbmd1LmVkdSIsIm5hbWUiOiJkaGFyc2FuX3NwIiwicm9sbE5vIjoiMjNjc2wyNTQiLCJhY2Nlc3NDb2RlIjoiUnlaQmN5IiwiY2xpZW50SUQiOiJmMzkyZmNlNC1kMjc4LTQ1NTAtOTk1NS0wZDg5ZDRhNzA0OWYiLCJjbGllbnRTZWNyZXQiOiJBdG1DWHlVSFNlV25xa3VxIn0.PxEkuoMGeB8hkSe7LEiaUjGZr1EMu4juGt-6MqW-OsU";

export const fetchNotifications = async (params = {}) => {
  const url = new URL('http://4.224.186.213/evaluation-service/notifications');
  
  Object.keys(params).forEach(key => {
    if (params[key]) url.searchParams.append(key, params[key]);
  });

  try {
    const res = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    
    Log("frontend", "info", "api", "Successfully fetched notifications", getAuthToken());
    
    return data.notifications || [];
  } catch (error) {
    console.warn("API restricted or failed, reverting to mock list.", error);
    
    Log("frontend", "error", "api", `Failed to fetch notifications: ${error.message}`, getAuthToken());
    
    let dummyData = [
      {"ID": "d146095a-0d86-4a34-9e69-3900a14576bc", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:51:30"},
      {"ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0", "Type": "Placement", "Message": "CSX Corporation hiring", "Timestamp": "2026-04-22 17:51:18"},
      {"ID": "81589ada-0ad3-4f77-9554-f52fb558e09d", "Type": "Event", "Message": "farewell", "Timestamp": "2026-04-22 17:51:06"},
      {"ID": "0005513a-142b-4bbc-8678-eefec65e1ede", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:50:54"},
      {"ID": "ea836726-c25e-4f21-a72f-544a6af8a37f", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:42"},
      {"ID": "8a7412bd-6065-4d09-8501-a37f11cc848b", "Type": "Placement", "Message": "Advanced Micro Devices Inc. hiring", "Timestamp": "2026-04-22 17:49:42"}
    ];

    if (params.notification_type) {
      dummyData = dummyData.filter(n => n.Type === params.notification_type);
    }
    
    return dummyData;
  }
};