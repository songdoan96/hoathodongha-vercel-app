import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

interface NotificationPayload {
  title: string;
  body: string;
  imageUrl?: string;
  data?: Record<string, string>;
}

@Injectable()
export class FirebaseService {
  private messaging: admin.messaging.Messaging;
  constructor(private readonly configService: ConfigService) {
    const serviceAccount = {
      projectId: this.configService.get('FIREBASE.PROJECT_ID'),
      clientEmail: this.configService.get('FIREBASE.CLIENT_EMAIL'),
      privateKey: this.configService
        .get('FIREBASE.PRIVATE_KEY')
        ?.replace(/\\n/g, '\n'),
    };

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
      });
    }

    this.messaging = admin.messaging();
  }

  async sendToDevice(
    token: string,
    payload: NotificationPayload,
  ): Promise<string> {
    try {
      const message: admin.messaging.Message = {
        token,
        notification: {
          title: payload.title,
          body: payload.body,
          imageUrl: payload.imageUrl,
        },
        data: payload.data,
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
            channelId: 'default',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
            },
          },
        },
      };

      const response = await this.messaging.send(message);
      return response;
    } catch (error) {
      throw new Error(`Failed to send notification: ${error.message}`);
    }
  }

  async sendToMultipleDevices(
    tokens: string[],
    payload: NotificationPayload,
  ): Promise<admin.messaging.BatchResponse> {
    try {
      const message: admin.messaging.MulticastMessage = {
        tokens,
        notification: {
          title: payload.title,
          body: payload.body,
          imageUrl: payload.imageUrl,
        },
        data: payload.data,
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
            },
          },
        },
      };

      const response = await this.messaging.sendEachForMulticast(message);

      // if (response.failureCount > 0) {
      //   console.log(`${response.failureCount} notifications failed`);
      // }

      return response;
    } catch (error) {
      throw new Error(`Failed to send notifications: ${error.message}`);
    }
  }
  // Send notification to a topic
  async sendToTopic(
    topic: string,
    payload: NotificationPayload,
  ): Promise<string> {
    try {
      const message: admin.messaging.Message = {
        topic,
        notification: {
          title: payload.title,
          body: payload.body,
          imageUrl: payload.imageUrl,
        },
        data: payload.data,
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
            },
          },
        },
      };

      const response = await this.messaging.send(message);
      return response;
    } catch (error) {
      throw new Error(`Failed to send topic notification: ${error.message}`);
    }
  }

  // Subscribe tokens to a topic
  async subscribeToTopic(
    tokens: string[],
    topic: string,
  ): Promise<admin.messaging.MessagingTopicManagementResponse> {
    try {
      const response = await this.messaging.subscribeToTopic(tokens, topic);
      return response;
    } catch (error) {
      throw new Error(`Failed to subscribe to topic: ${error.message}`);
    }
  }

  // Unsubscribe tokens from a topic
  async unsubscribeFromTopic(
    tokens: string[],
    topic: string,
  ): Promise<admin.messaging.MessagingTopicManagementResponse> {
    try {
      const response = await this.messaging.unsubscribeFromTopic(tokens, topic);
      return response;
    } catch (error) {
      throw new Error(`Failed to unsubscribe from topic: ${error.message}`);
    }
  }

  // Send data-only message (silent notification)
  async sendDataMessage(
    token: string,
    data: Record<string, string>,
  ): Promise<string> {
    try {
      const message: admin.messaging.Message = {
        token,
        data,
        android: {
          priority: 'high',
        },
      };

      const response = await this.messaging.send(message);
      return response;
    } catch (error) {
      throw new Error(`Failed to send data message: ${error.message}`);
    }
  }
}
