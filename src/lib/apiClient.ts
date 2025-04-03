import axios, { AxiosInstance } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API

const http = axios.create({
  baseURL: BASE_URL + "/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
}) as AxiosInstance

export { http }
