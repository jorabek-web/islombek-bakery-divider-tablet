import { GetNotificationResponse } from "./types.d";

export interface GetNotificationRequest {
  id: string;
}

export interface GetNotificationResponse {
  _id: string;
  title: string;
  branch: string;
  body: string;
  from: string;
  toUser: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationSubscribeRequest {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

interface NotificationPushRequest {
  id: string;
  body: {
    title: string;
    body?: string;
  };
}
