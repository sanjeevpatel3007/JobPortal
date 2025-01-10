// Add this to your constants file
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
export const USER_API_END_POINT="https://jobportal-backend-ov5w.onrender.com/api/v1/user";
export const JOB_API_END_POINT="https://jobportal-backend-ov5w.onrender.com/api/v1/job";
export const APPLICATION_API_END_POINT="https://jobportal-backend-ov5w.onrender.com/api/v1/application";
export const COMPANY_API_END_POINT="https://jobportal-backend-ov5w.onrender.com/api/v1/company";
  export  const BASE_URL = "https://jobportal-backend-ov5w.onrender.com/api"    ;      
         
         
// export const USER_API_END_POINT="http://localhost:8000/api/v1/user";
// export const JOB_API_END_POINT="http://localhost:8000/api/v1/job";
// export const APPLICATION_API_END_POINT="http://localhost:8000/api/v1/application";
// export const COMPANY_API_END_POINT="http://localhost:8000/api/v1/company";
// export const BASE_URL = "http://localhost:8000/api";

export const ATS_RESUME_SCORE_END_POINT = `${BASE_URL}/analyze-resume`;